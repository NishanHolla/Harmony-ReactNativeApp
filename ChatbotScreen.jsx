import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LlamaAI from 'llamaai';

const apiToken = 'LL-43Z9T477M2ntRSL2TBAt3H7lV2kCWWXCZy0UtALfAjz9pYHR0ygfjonjOO8GEscr';
const llamaAPI = new LlamaAI(apiToken);


const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '');


const ChatBot = () => {


  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentUserMessageIndex, setRecentUserMessageIndex] = useState(null);
  const [promptRes, setPromptRes] = useState('loading...');
  const [messages, setMessages] = useState([
    {
      id: uid(),
      convo: {
        User: "",
        Harmony: "Hi i am Harmony your friend, how can i help you?",
      },
      date: new Date()
    },
  ]);

  const promtResponse = async () => {
    console.log("query recieved")
    api_request_json = {
      "model": "llama-13b-chat",
      "messages": [
        {"role": "system", "content": "You are a assistant called Harmony, you are a mental health chatbot talk supportive and in a caring way"},
        {"role": "user", "content": `${query}`},
      ]
    }
  
    llamaAPI.run(api_request_json)
    .then(response => {
      console.log(response.choices[0].message.content);
      setPromptRes(response.choices[0].message.content);
      setQuery('');
      sendMessage(response.choices[0].message.content);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const MessageItem = ({ message, isUser }) => (
    <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
      <Text style={styles.messageText}>{isUser ? 'User: ' : 'Harmony: '}{message}</Text>
    </View>
  );

  const sendMessage = (response) => {
    const newUserMessage = {
      id: uid(),
      convo: {
        User: query,
        Harmony: "Waiting for Harmony's response...",
      },
      date: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setQuery('');
    setIsLoading(true);
    setRecentUserMessageIndex(messages.length);

    setTimeout(() => {
      const newHarmonyMessage = {
        id: uid(),
        convo: {
          User: '',
          Harmony: `${response}`,
        },
        date: new Date(),
      };
    
      const messagesToUpdate = [...messages, newUserMessage];
      const messageToUpdate = messagesToUpdate.find(message => message.id === newUserMessage.id);
      messageToUpdate.convo.Harmony = newHarmonyMessage.convo.Harmony;
    
      setMessages(messagesToUpdate);
      setIsLoading(false);
    }, 3000);
     
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <MessageItem message={item.convo.User} isUser={true} />
            {isLoading && recentUserMessageIndex !== null && item.id === messages[recentUserMessageIndex].id ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="black" />
              </View>
            ) : (
              <MessageItem message={item.convo.Harmony} isUser={false} />
            )}
          </>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TextInput
          label="Type your message"
          value={query}
          onChangeText={(text) => setQuery(text)}
          style={{ flex: 1, marginRight: 10, color: 'black', backgroundColor: "white" }}
        />
        <Button
          mode="contained"
          onPress={promtResponse}
          contentStyle={{ height: 50 }} // Set the height of the button
        >
          Send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue', // Default background color for user messages
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightpink', // Default background color for bot messages
  },
  messageText: {
    color: 'black',
    fontWeight: '800' // Changed the color to black for better readability
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    padding: 10,
  },
});

export default ChatBot;
