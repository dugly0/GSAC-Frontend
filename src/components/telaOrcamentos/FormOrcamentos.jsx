import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function FormOrcamentos() {
  const [formData, setFormData] = useState({
    descricao: "",
    data_entrega: "",
    servico_orcamento: [],
  });
  const [servicosDisponiveis, setServicosDisponiveis] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const token = getToken();
        const response = await axios.get("http://localhost:8080/api/servico", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServicosDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        if (error.response && error.response.status === 401) {
          history("/"); // Redireciona para a página inicial em caso de erro de autorização
        }
      }
    };

    fetchServicos();
  }, [history]);

  const getToken = () => {
    const roleID = localStorage.getItem("role_id");
    if (roleID != 2) {
      alert("Você não tem permissão para acessar esta página.");
      return;
    }
    const token = localStorage.getItem("token");
    return token;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleServicoChange = (index, field, value) => {
    const updatedServicos = [...formData.servico_orcamento];
    updatedServicos[index][field] =
      field === "servico_id" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      servico_orcamento: updatedServicos,
    }));
  };

  const addServico = () => {
    setFormData((prevData) => ({
      ...prevData,
      servico_orcamento: [
        ...prevData.servico_orcamento,
        { servico_id: "", quantidade: "" },
      ],
    }));
  };

  const removeServico = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      servico_orcamento: prevData.servico_orcamento.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se os campos obrigatórios estão preenchidos
    if (
      !formData.descricao ||
      !formData.data_entrega ||
      formData.servico_orcamento.length === 0
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const token = getToken(); // Obter o token de autenticação

      const response = await axios.post(
        "http://localhost:8080/api/orcamento",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir o token no cabeçalho
          },
        }
      );
      console.log("Orçamento criado:", response.data);

      // Exibir mensagem de sucesso
      setShowSuccessMessage(true);

      // Limpar o formulário (opcional)
      setFormData({
        descricao: "",
        data_entrega: "",
        servico_orcamento: [],
      });

      // Ocultar a mensagem de sucesso após um tempo (opcional)
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1200); // 3 segundos
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      // Lógica para lidar com o erro (ex: exibir mensagem de erro)
    }
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Campos para descrição e data de entrega */}
      <Form.Group controlId="descricao">
        <Form.Label>Descrição:</Form.Label>
        <Form.Control
          as="textarea"
          value={formData.descricao}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="data_entrega">
        <Form.Label>Data de Entrega:</Form.Label>
        <Form.Control
          type="date"
          value={formData.data_entrega}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      {/* Campos para os serviços */}
      <h2>Serviços:</h2>
      {formData.servico_orcamento.map((servico, index) => (
        <div key={index}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId={`servico_id-${index}`}>
                <Form.Label>Serviço:</Form.Label>
                <Form.Select
                  value={servico.servico_id}
                  onChange={(e) =>
                    handleServicoChange(
                      index,
                      "servico_id",
                      parseInt(e.target.value, 10)
                    )
                  }
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {servicosDisponiveis.map((servicoDisponivel) => (
                    <option
                      key={servicoDisponivel.id}
                      value={servicoDisponivel.id}
                    >
                      {servicoDisponivel.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`quantidade-${index}`}>
                <Form.Label>Quantidade:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantidade"
                  value={servico.quantidade}
                  onChange={(e) =>
                    handleServicoChange(index, "quantidade", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => removeServico(index)}
                style={{
                  cursor: "pointer",
                  color: "rgb(255, 0, 0)",
                }}
              />
            </Col>
          </Row>
        </div>
      ))}
      {/* Mensagem de sucesso (exibida condicionalmente) */}
      {showSuccessMessage && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessMessage(false)}
          dismissible
        >
          Orçamento criado com sucesso!
        </Alert>
      )}

      <Button
        variant="outline-light"
        style={{ backgroundColor: "#820053" }}
        onClick={addServico}
      >
        Adicionar Serviço
      </Button>
      <div className="d-flex justify-content-end p-2">
        <Button
          variant="outline-light"
          type="submit"
          style={{ backgroundColor: "#820053" }}
          className="ms-auto" // Adiciona margem automática à esquerda
        >
          Solicitar Orçamento
        </Button>
      </div>
    </Form>
  );
}

export default FormOrcamentos;
