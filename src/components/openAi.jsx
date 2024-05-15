const SendMessage = async ({
  setMessages,
  messages,
  SearchTerm,
  setisLoading,
  setSearchTerm,
  convId,
}) => {
  const sentMsg = [...messages, { role: 'user', content: SearchTerm }];
  setSearchTerm('');
  setisLoading(true);

  setMessages([...messages, { role: 'user', content: SearchTerm }]);

  try {
    const response = await fetch(
      `http://localhost:5000/updateAndGenerate/${convId}`,
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
    setisLoading(false);
  } catch (error) {
    console.error('Error:', error);
  }
};
const GetMessage = async ({ setData, setMessages, setisLoading, convId }) => {
  setisLoading(true); // Start loading indicator

  try {
    const response = await fetch(
      `http://localhost:5000/chatHistory/${convId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

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
