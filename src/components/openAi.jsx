import { BACKEND_URL } from '../URLS';
const URL = 'https://nodejs-backend2.onrender.com';

const SendMessage = async ({
  lastText,
  setLastText,
  setMessages,
  messages,
  SearchTerm,
  setisLoading,
  setSearchTerm,
  convId,
}) => {
  const sentMsg = [...messages, { role: 'user', content: SearchTerm }];

  setLastText('');
  setisLoading(true);

  setMessages([...messages, { role: 'user', content: SearchTerm }]);

  if (SearchTerm !== '') {
    try {
      setSearchTerm('');
      const response = await fetch(
        `${BACKEND_URL}/updateAndGenerate/${convId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: sentMsg,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.result) setMessages(data.result);

      setLastText(data.result.at(-1).content);
      setisLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    setisLoading(false);
    return messages;
  }
};
const GetMessage = async ({ setData, setMessages, setisLoading, convId }) => {
  setisLoading(true); // Start loading indicator

  try {
    const response = await fetch(`${BACKEND_URL}/chatHistory/${convId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data) {
      setMessages(data.messages);
      setData(data);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setisLoading(false); // Stop loading indicator regardless of success or failure
  }
};

export { SendMessage, GetMessage };
