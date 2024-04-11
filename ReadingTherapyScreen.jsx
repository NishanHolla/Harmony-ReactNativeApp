import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, List, Divider, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const MusicTherapyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [positiveArticles] = useState([
    {
      title: 'The Healing Power of Music',
      description: 'Explore how music therapy can improve mental health and well-being. From reducing stress and anxiety to enhancing mood and promoting relaxation, discover the therapeutic benefits of music.',
    },
    {
      title: 'Music and Mindfulness',
      description: 'Discover how combining music with mindfulness practices can help you achieve inner peace and emotional balance. Learn techniques for incorporating music into your mindfulness routine.',
    },
    {
      title: 'Rhythms of Recovery',
      description: 'Explore the role of rhythm and beat in recovery from addiction and trauma. Discover how music therapy can aid in processing emotions, building resilience, and fostering healing.',
    },
    {
      title: 'Expressive Arts Therapy',
      description: 'Learn about the intersection of music, art, and therapy. Explore how creative expression through music and other art forms can facilitate emotional healing and personal growth.',
    },
    {
      title: 'Soothing Sounds for Sleep',
      description: 'Discover calming music and soundscapes to improve sleep quality and promote relaxation. Explore how music can create a peaceful bedtime environment conducive to restful sleep.',
    },
    {
      title: 'The Power of Positive Thinking',
      description: 'Discover the benefits of staying positive in life. Positive thinking can lead to better mental and physical health, improved relationships, and increased resilience in facing life challenges.',
    },
    {
      title: '10 Habits for a Happy Life',
      description: 'Learn simple habits that can bring joy and fulfillment. From practicing gratitude to spending time with loved ones, discover how incorporating these habits into your daily routine can lead to a happier life.',
    },
    {
      title: 'Embracing Gratitude',
      description: 'How gratitude can transform your outlook on life. Cultivating a sense of gratitude can shift your focus from what you lack to what you have, leading to greater contentment and happiness.',
    },
    {
      title: 'The Healing Power of Music',
      description: 'Explore how music therapy can improve mental health and well-being. From reducing stress and anxiety to enhancing mood and promoting relaxation, discover the therapeutic benefits of music.',
    },
    {
      title: 'Finding Joy in Nature',
      description: 'Connect with nature to find inner peace and joy. Spending time outdoors, whether it\'s going for a hike, gardening, or simply enjoying the beauty of the natural world, can uplift your spirits and improve your overall well-being.',
    },
  ]);

  const filteredArticles = positiveArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Searchbar
        placeholder="Search articles"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 10, backgroundColor: 'white' }} // Set background color to white
      />
      </View>
      {/* Articles Section */}
      <FlatList
        data={filteredArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.description}
            onPress={() => {
              // Handle article selection
            }}
            titleStyle={styles.articleTitle}
            descriptionStyle={styles.articleDescription}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5 ,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
  },
  articleTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  articleDescription: {
    color: 'black',
  },
});

export default MusicTherapyScreen;
