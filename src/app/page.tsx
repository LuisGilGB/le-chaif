import Chat from '@/app/Chat';
import {AI} from './actions';

const metadata = {
  title: 'Le ChAIf',
  description: 'A chatbot that help you at your cooking needs providing recipes with the best User Experience.'
};

const HomePage = () => (
  <AI>
    <Chat />
  </AI>
);

export default HomePage;
