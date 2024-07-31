import { TallComments } from '@/types/posts/qnaDetailTypes';
import QnaAnswer from './QnaAnswer';

type QnaAnswersProps = {
  qnaAnswers: TallComments[];
};

const QnaAnswers = ({ qnaAnswers }: QnaAnswersProps) => {
  console.log(qnaAnswers[0]);
  return (
    <div>
      {qnaAnswers.map((qnaAnswer) => {
        return <QnaAnswer key={qnaAnswer.id} qnaAnswer={qnaAnswer} />;
      })}
    </div>
  );
};

export default QnaAnswers;
