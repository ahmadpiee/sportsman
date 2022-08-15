import {Proxima} from 'components';
import Colors from 'config/Colors';
import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import moment from 'moment';

const Article = (props) => {
  const article = [
    {
      id: 0,
      title: 'Why We Should Do Exercise Regularly?',
      link:
        'https://www.lifehack.org/articles/lifestyle/15-reasons-why-you-should-start-running-and-not-put-off-anymore.html',
      source: 'Life Hack',
    },
    {
      id: 1,
      title: 'The Mental Health Benefits of Exercise',
      link:
        'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm',
      source: 'Medium',
    },
    {
      id: 2,
      title: 'What to know about exercise and how to start',
      link: 'https://www.medicalnewstoday.com/articles/153390',
      source: 'Medical News Today',
    },
    {
      id: 3,
      title: 'Exercise and the Brain: How Fitness Impacts Learning',
      link:
        'https://www.wgu.edu/heyteach/article/exercise-and-brain-how-fitness-impacts-learning1801.html',
      source: 'Hey Teach',
    },
    {
      id: 4,
      title: 'Why is physical activity so important for health and wellbeing?',
      link:
        'https://www.heart.org/en/healthy-living/fitness/fitness-basics/why-is-physical-activity-so-important-for-health-and-wellbeing',
      source: 'Heart',
    },
    {
      id: 5,
      title: 'Best Exercises for Health and Weight Loss',
      link:
        'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm',
      source: 'Help Guide',
    },
    {
      id: 6,
      title: 'How to Exercise with Limited Mobility',
      link:
        'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm',
      source: 'Help Guide',
    },
    {
      id: 7,
      title: 'Senior Exercise and Fitness Tips',
      link:
        'https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm',
      source: 'Help Guide',
    },
  ];

  const MainArticle = ({bgColor, article}) => (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        height: wp(40),
        width: wp(45),
        borderRadius: ms(10),
        elevation: ms(5),
        padding: ms(10),
        justifyContent: 'space-between',
      }}
      onPress={() => {
        props.navigation.navigate('ArticleWeb', {link: article.link});
      }}>
      <Proxima
        title={article.title}
        type="Bold"
        size={18}
        color={Colors.white}
      />
      <Proxima title={article.source} size={12} color={Colors.white} />
    </TouchableOpacity>
  );

  const renderArticle = ({item, index}) => (
    <>
      {index == 0 || index == 1 ? null : (
        <View style={{paddingVertical: ms(5), paddingHorizontal: ms(16)}}>
          <TouchableOpacity
            style={[
              {
                height: hp(15),
                elevation: ms(5),
                borderRadius: ms(10),
                padding: ms(15),
                justifyContent: 'space-between',
              },
              index % 2 == 0
                ? {backgroundColor: Colors.secondary.orange}
                : {backgroundColor: 'white'},
            ]}
            onPress={() => {
              props.navigation.navigate('ArticleWeb', {link: item.link});
            }}>
            <Proxima
              title={item.title}
              type="Bold"
              size={18}
              numberOfLines={2}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{justifyContent: 'center'}}>
                <Proxima title={moment().format('LLL')} size={11} />
              </View>
              <Proxima title={item.source} size={12} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Proxima
        title="Read Arcticle"
        type="Bold"
        size={24}
        style={{paddingHorizontal: ms(16), paddingTop: hp(5)}}
      />

      <View
        style={{
          paddingHorizontal: ms(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: ms(10),
        }}>
        <MainArticle bgColor={Colors.orange2} article={article[0]} />
        <MainArticle bgColor={Colors.grey3} article={article[1]} />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={article}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id.toString()}
        scrollsToTop={true}
      />
    </View>
  );
};

export default Article;
