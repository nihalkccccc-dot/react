
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Card5(props) {
  return (
    <Card style={{ width: '18rem' }}>

      <Card.Img variant="top" src={props.image} />

      <Card.Body>

        <Card.Title>
          {props.department}
        </Card.Title>

        <Card.Text>
          {props.description}
        </Card.Text>

        <Button
          variant="danger"
          onClick={() => props.deleteComplaint(props.id)}
        >
          Delete
        </Button>

      </Card.Body>

    </Card>
  );
}

export default Card5;

