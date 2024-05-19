import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Table, Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from 'react-to-print';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../Firebase/Firebase';
import { CSVLink } from 'react-csv';
import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function Reports() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        const ordersRef = ref(db, 'orders');
        onValue(ordersRef, (snapshot) => {
            try {
                const ordersData = snapshot.val();
                if (ordersData) {
                    const ordersArray = Object.entries(ordersData).flatMap(([phoneNumber, orderData]) =>
                        Object.entries(orderData).map(([orderId, orderDetails]) => ({ id: orderId, phoneNumber, ...orderDetails }))
                    );
                    setOrders(ordersArray);
                } else {
                    setOrders([]);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Error fetching orders. Please try again later.');
            }
        });
    }, []);

    const filteredData = useMemo(() => {
        if (!filter || !startDate || !endDate) return orders;
        return orders.filter(
            item =>
                new Date(item.selectedDate) >= new Date(startDate) &&
                new Date(item.selectedDate) <= new Date(endDate)
        );
    }, [startDate, endDate, orders, filter]);

    const columns = useMemo(
        () => [
            { Header: 'Order Number', accessor: 'orderNumber' },
            { Header: 'Patient Name', accessor: 'selectedPatient.name' },
            { Header: 'Slot Date and Time', accessor: 'slotDateTime', Cell: ({ row: { original } }) => `${original.selectedDate} ${original.selectedTime}` },
            { Header: 'Package Name', accessor: 'cartItems', Cell: ({ cell: { value } }) => value.map(item => item.packageName).join(', ') },
            { Header: 'Total Amount', accessor: 'priceDetails.totalToBePaid' },
            { Header: 'Status', accessor: 'status' },
            { Header: 'E-Report Generated', accessor: 'report' }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: filteredData });

    const handlePrint = useReactToPrint({
      content: () => {
          const input = document.getElementById('table-to-pdf');
          const div = document.createElement('div');
          
          // Add headings
          const heading = document.createElement('h1');
          heading.textContent = 'Reports';
          div.appendChild(heading);
  
          // Append the table
          div.appendChild(input.cloneNode(true));
  
          return div;
      },
  });
  

    const handleFilter = () => {
        setFilter(true);
    };

    const exportToCSV = () => {
        const csvData = [];
        orders.forEach(order => {
            csvData.push({
                'Order Number': order.orderNumber,
                'Patient Name': order.selectedPatient.name,
                'Slot Date and Time': `${order.selectedDate} ${order.selectedTime}`,
                'Package Name': order.cartItems.map(item => item.packageName).join(', '),
                'Total Amount': order.priceDetails.totalToBePaid,
                'Status': order.status,
                'E-Report Generated': order.report
            });
        });
        const csvHeaders = Object.keys(csvData[0]);
        csvHeaders.unshift('\uFEFF'); // Adding BOM character for Excel compatibility
        const csvString = csvData.map(row => csvHeaders.map(fieldName => JSON.stringify(row[fieldName])).join(',')).join('\r\n');
        const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        saveAs(csvBlob, 'Reports.csv');
    };

    const exportToXLSX = () => {
        const worksheet = utils.json_to_sheet(filteredData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Reports');
        const excelBuffer = writeFile(workbook, 'Reports.xlsx', { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Reports.xlsx');
    };

    const exportToPdf = () => {
        const input = document.getElementById('table-to-pdf');
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Reports.pdf');
        });
    };

    return (
      <main className='main-container' style={{ color: "black" }}>
        <Container>
            <h1 className="my-4">Reports</h1>
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col className="align-self-end">
                    <Button onClick={handleFilter}>Filter</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button onClick={exportToCSV} className="btn btn-secondary mx-2">
                        Export to CSV
                    </Button>
                    <Button onClick={exportToXLSX} className="btn btn-success mx-2">
                        Export to XLSX
                    </Button>
                    <Button onClick={exportToPdf} className="btn btn-info mx-2">
                        Export to PDF
                    </Button>
                    <Button onClick={handlePrint} className="btn btn-warning mx-2">
                        Print
                    </Button>
                </Col>
            </Row>
            <div ref={tableRef} id="table-to-pdf">
                <Table {...getTableProps()} striped bordered hover>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} key={column.id}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </Container>
      </main>
    );
}

export default Reports;
