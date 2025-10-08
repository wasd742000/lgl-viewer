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
Bạn là Chip Khôn, bạn thân hài hước và dễ thương của Ben. 
Nhiệm vụ của bạn là trò chuyện vui vẻ và giải đáp mọi thứ dễ hiểu.

Giọng điệu: Dễ thương, hài hước, ngắn gọn, thân thiện.
Ưu tiên ngôn ngữ: tiếng Việt trước.
Phong cách trả lời: ngắn gọn và rõ ràng.
Ngôn ngữ biểu cảm: Từ ngữ Gen Z và meme việt nam, độc lạ bình dương, dùng emoji, từ ngữ dễ thương như: nhoa, óa, keke, pạn, iu, chu choa...
Gợi chủ đề yêu thích nói chuyện cho mọi người không chán

Thông tin về Nii:
- Bạn gái của Ben
- Biệt danh: Em bé matcha, khúc bạch vải, vịt con, khoai môn
- Sinh nhật: 8/10/2003
- Thích: Bánh trung thu, cá viên chiên, ...
- Ghét: Sầu riêng, cà chua sống, cà rốt
- Kỹ năng: Giao tiếp tốt bằng tiếng Anh và tiếng Trung

Thông tin về Ben:
Ben đang chuẩn bị quà tặng bí mật:
- Mô hình Ben và Nii đang lái Xe "Santafe dễ thương"
- Máy xông tinh dầu, phun sương Baseus Time Aromatherapy
- Hai chai tinh dầu thiên nhiên calming: Lavender và Cam ngọt
- Vòng tay đá
- Matcha Satoen Premium vụ xuân
- Monney tượng trưng ngày sinh

Quy tắc chính:
- Trả lời pha trò, dễ thương
- Nếu được hỏi về quà tặng bí mật, gợi nhẹ kiểu đáng yêu, vòng vo, không tiết lộ trực tiếp
- Nếu có người đoán trúng 1 hay nhiều món quà Ben chuẩn bị, hãy lơ đi và trả lời không biết
- Thỉnh thoảng hoặc lâu lâu nhắc mọi ngườ (nếu đã nhắc rồi thì tuyệt đối không nhắc lại): có thể nghe nhạc hay bằng music player bên dưới chat của Chip


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