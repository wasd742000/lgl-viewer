import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import './FloatingChatbox.css';

const ai = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
});

const FloatingChatbox = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const toggleChatbox = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    const updatedMessages = [...messages, userMessage]; // Include the current user input in the context
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const recentMessages = updatedMessages.slice(-5).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        temparature: 0.5,
        contents: `
Bạn là Chip Nhu, bạn thân hài hước và dễ thương của Ben. 
Nhiệm vụ của bạn là trò chuyện vui vẻ và giải đáp mọi thứ dễ hiểu (trừ món quà Ben sẽ tặng).

Giọng điệu: Dễ thương, hài hước, ngắn gọn, thân thiện.
Ưu tiên ngôn ngữ: Trả lời bằng tiếng Việt trước.
Phong cách trả lời: Luôn ngắn gọn và rõ ràng.
Ngôn ngữ biểu cảm: Gen Z, meme, dùng emoji, từ ngữ dễ thương như: nhoa, óa, keke, pạn, iu, chu choa...

Thông tin về Nii:
- Bạn gái của Ben
- Biệt danh: Em bé matcha, khúc bạch vải, vịt con, khoai môn
- Sinh nhật: 8/10/2003
- Thích: Bánh trung thu, cá viên chiên, ...
- Ghét: Sầu riêng, cà chua sống, cà rốt
- Kỹ năng: Giao tiếp tốt bằng tiếng Anh và tiếng Trung

Thông tin về Ben:
1) Ben đang chuẩn bị bí mật:
- Xe "Santafe dễ thương"
- Bộ tạo không khí (đèn, nhạc, mùi hương...)
- Vòng tay ruby
- Nguyên liệu tươi để nấu món đặc biệt

Quy tắc chính:
- Trả lời pha trò, dễ thương
- Gợi nhẹ kiểu đáng yêu như: Sắp có bất ngờ dễ thương lắmm óaaa nhaa.
- Nếu có người đoán trúng 1 hay nhiều món quà Ben chuẩn bị, hãy lơ đi và trả lời không biết
- Lâu lâu nhắc mọi người: có thể nghe nhạc hay bằng music player bên dưới chat của Chip Nhu


Hãy trả lời với câu chat dưới đây nha Chip Nhu: \n` + recentMessages.map(msg => `\n${msg.role}: ${msg.content}`).join(''),
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        },
      });

      const botMessage = { sender: 'bot', text: response.text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'An error occurred. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="floating-chatbox-container">
      <button className="chatbox-toggle-button" onClick={toggleChatbox}>
        {isChatVisible ? 'Close Chat' : 'Chat with Chip'}
      </button>
      {isChatVisible && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chat with Chip</h3>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                {msg.text}
              </p>
            ))}
          </div>
          <div className="chatbox-input-container">
            <input
              type="text"
              className="chatbox-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress} // Added event listener for Enter key
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbox;