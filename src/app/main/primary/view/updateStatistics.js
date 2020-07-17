/* eslint-disable max-len */
import { getUserStatistic, upsertUserStatistic } from '../../../common/index';

export default async function updateStatistics(token, userId, countWords) {
  const today = new Date().toLocaleDateString();
  const timestamp = Date.parse(new Date());
  const statistic = await getUserStatistic(token, userId);
  if (statistic === null) {
    const newLearnedWords = {
      learnedWords: countWords,
      optional: {
        days: {
          learnedWords: [countWords],
          date: [timestamp],
        },
      },
    };
    await upsertUserStatistic(token, userId, newLearnedWords);
  } else {
    const lastDay = new Date(statistic.optional.days.date[statistic.optional.days.date.length - 1])
      .toLocaleDateString();
    if (today === lastDay) {
      statistic.optional.days.learnedWords[statistic.optional.days.learnedWords.length - 1] += countWords;
      const newLearnedWords = {
        learnedWords: statistic.learnedWords + countWords,
        optional: {
          days: {
            learnedWords: statistic.optional.days.learnedWords,
            date: statistic.optional.days.date,
          },
        },
      };
      await upsertUserStatistic(token, userId, newLearnedWords);
    } else {
      const newLearnedWords = {
        learnedWords: statistic.learnedWords + countWords,
        optional: {
          days: {
            learnedWords: [...statistic.optional.days.learnedWords, countWords],
            date: [...statistic.optional.days.date, timestamp],
          },
        },
      };
      await upsertUserStatistic(token, userId, newLearnedWords);
    }
  }
}
