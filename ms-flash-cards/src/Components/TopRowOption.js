import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export function TopRowOption({ value, label, setState, children }) {
  return (
    <Col xxs={12} xs={6} sm={4} md={3} lg className="my-1">
      <FloatingLabel controlId="floatingInput" label={label}>
        <Form.Select
          value={value}
          onChange={(e) =>
            setState(isNaN(value) ? e.target.value : Number(e.target.value))
          }
        >
          {children}
        </Form.Select>
      </FloatingLabel>
    </Col>
  );
}
