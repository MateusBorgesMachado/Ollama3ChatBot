document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatWindow = document.getElementById("chat-window");

  if (!userInput || !sendButton || !chatWindow) {
    console.error(
      "Erro: Um ou mais elementos do DOM não foram encontrados. Verifique os IDs no HTML."
    );
    return;
  }

  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(
      sender === "user" ? "user-message" : "bot-message"
    );
    messageElement.textContent = text;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  async function handleSendMessage() {
    const messageText = userInput.value.trim();
    if (messageText !== "") {
      addMessage(messageText, "user");
      userInput.value = "";
      userInput.focus();

      try {
        const response = await fetch("http://localhost:3000/ia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: messageText }),
        });

        if (!response.ok) {
          throw new Error("Erro na resposta do servidor.");
        }

        const botResponseText = await response.json();
        addMessage(botResponseText, "bot");
      } catch (error) {
        console.error("Erro ao comunicar com o backend:", error);
        addMessage(
          "Desculpe, não consegui obter uma resposta. Tente novamente.",
          "bot"
        );
      }
    }
  }

  sendButton.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  });

  addMessage("Olá! Como posso ajudar você hoje?", "bot");
});
