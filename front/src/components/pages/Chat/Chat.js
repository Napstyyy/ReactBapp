import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/Chat.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import MoreAttachments from "../../../assets/images/Chat/MoreAttachments.png";
import InputImage from "../../../assets/images/Chat/InputImage.png";
import SendMessageIcon from "../../../assets/images/Chat/SendMessageIcon.png";
import { useUser } from '../../context/UserContext'; // Importa el contexto

const ChatView = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]); // Estado para almacenar los mensajes
  const { userType, userEmail } = useUser(); // Obtén userType del contexto
  const location = useLocation();
  const { projectId, name } = location.state; // Obtiene el projectId de la ubicación
  const nameProjectId = name || projectId; // Usa projectId si name no está disponible
  const [newMessage, setNewMessage] = useState(""); // Estado para el nuevo mensaje
  const messagesEndRef = useRef(null); // Ref para el scroll automático
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Función para obtener los mensajes
    const fetchMessages = () => {
      axios.get(`${apiUrl}/projects/messages/${nameProjectId}`)
        .then(response => {
          console.log("chats: ", response.data);
          setChats(response.data);
          scrollToBottom(); // Desplaza hacia abajo después de cargar los mensajes
        })
        .catch(error => {
          console.error("Hubo un error al obtener los mensajes!", error);
        });
    };

    fetchMessages();

    // Opcional: establecer un intervalo para actualizar los mensajes en tiempo real
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); // cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [nameProjectId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // No enviar mensajes vacíos

    // Prepend the userType to the message text
    const messageToSend = `${userType}${newMessage}`;

    // Realiza el POST al backend
    axios.post(`${apiUrl}/projects/messages/${nameProjectId}`, {
      text: messageToSend,
      message_file: null // Ajusta si necesitas manejar archivos
    })
      .then(response => {
        console.log("Mensaje enviado exitosamente:", response.data);
        setNewMessage(""); // Limpia el input
        // Actualiza la lista de mensajes localmente
        setChats(prevChats => [...prevChats, {
          id_message: response.data.id,
          text: messageToSend,
          message_file: null
        }]);
        scrollToBottom();
      })
      .catch(error => {
        console.error("Hubo un error al enviar el mensaje!", error);
      });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNavigate = () => {
    navigate(-1);
  }

  return (
    <div className="chat-container">
      <div className="homeHeader">
        <button className="home-button left" onClick={() => handleNavigate()}>
          <RxDashboard />
        </button>
        <h2>Chat</h2>
        <button className="home-button right">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="notification-image"
          />
        </button>
      </div>
      <div className="Messages-Container">
        {chats.map((message) => {
          // Asegúrate de que el texto no está vacío y tiene al menos un carácter
          if (!message.text || message.text.length < 2) return null;

          const senderType = message.text.charAt(0); // Primer carácter
          const messageText = message.text.slice(1); // Texto sin el primer carácter

          // Determina si el mensaje es del usuario actual
          const isUser = senderType === String(userType);

          return (
            <div
              key={message.id_message}
              className={`message-container ${isUser ? "user-message" : "hashim-message"
                }`}
            >
              <div className="message-time">
                {new Date(message.id_message).toLocaleTimeString()}
              </div>
              {message.message_file ? (
                <img src={message.message_file} alt="Chat" className="message-image" />
              ) : (
                <div
                  className={`message-bubble ${isUser ? "user-bubble" : "hashim-bubble"
                    }`}
                >
                  {messageText}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <button className="attachment-button">
          <img
            src={MoreAttachments}
            alt="MoreAttachments"
            className="MoreAttachment-icon"
          />
        </button>
        <div className="input-with-camera">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className="camera-button">
            <img
              src={InputImage}
              alt="InputImage"
              className="InputImage-icon"
            />
          </button>
        </div>
        <button className="send-button" onClick={handleSendMessage}>
          <img
            src={SendMessageIcon}
            alt="SendMessageIcon"
            className="SendMessage-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatView;
