import Form from "react-bootstrap/Form";

export default function formUpdate() {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Tipo</Form.Label>
        <Form.Select className="form-control" defaultValue="" disabled={false}>
          <option value="" disabled hidden>
            Selecione o tipo da conta
          </option>
          <option>admin</option>
          <option>cliente</option>
          <option>gabinete</option>
          <option>chefelab</option>
          <option>teclab</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Id Laboratório</Form.Label>
        <Form.Control
          type="number"
          placeholder="Escolha o Id do laboratório"
          enable
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Nome Completo" enable />
      </Form.Group>
      <Form.Group className="mb-3" controlId="campoEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="exemplo@email.com" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" placeholder="000 000 000" enable />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rua ou Avenida/N/Distrito"
          enable
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cód. Postal</Form.Label>
        <Form.Control type="text" placeholder="Insira o código postal" enable />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nif</Form.Label>
        <Form.Control type="number" placeholder="Insira o Nif" enable />
      </Form.Group>
      <Form.Group controlId="foto" className="mb-3">
        <Form.Label>Foto</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </div>
  );
}
