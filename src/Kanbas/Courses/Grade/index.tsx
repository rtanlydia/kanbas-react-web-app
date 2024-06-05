import React from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import { FaFileImport, FaFileExport, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export default function Grades() {
  return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="mb-0">Grades</h1>
          <div className="d-flex">
            <Button variant="secondary" className="me-2">
              <FaFileImport className="me-1" /> Import
            </Button>
            <Button variant="secondary" className="me-2">
              <FaFileExport className="me-1" /> Export
            </Button>
            <Button variant="secondary">
              <FaCog />
            </Button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Control type="text" placeholder="Search Students" className="form-control" />
          </div>
          <div className="col-md-6">
            <Form.Control type="text" placeholder="Search Assignments" className="form-control" />
          </div>
        </div>
        <Button variant="secondary" className="mb-3">
          Apply Filters
        </Button>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Student Name</th>
              <th>A1 SETUP<br />Out of 100</th>
              <th>A2 HTML<br />Out of 100</th>
              <th>A3 CSS<br />Out of 100</th>
              <th>A4 BOOTSTRAP<br />Out of 100</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Jane Adams</td>
              <td>100%</td>
              <td>96.7%</td>
              <td>92.1%</td>
              <td>66.2%</td>
            </tr>
            <tr>
              <td>Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td>
                <Form.Control type="text" defaultValue="88.0%" className="form-control" />
              </td>
              <td>98.9%</td>
            </tr>
            <tr>
              <td>Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.7%</td>
              <td>98.3%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Siran Cao</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            </tbody>
          </Table>
        </div>
      </div>
  );
}
