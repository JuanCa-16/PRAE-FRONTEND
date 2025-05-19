import { useSound } from 'react-sounds';

const useAppSounds = () => {
  const { play: playBlocked } = useSound('ui/blocked');
  const { play: playSuccess } = useSound('ui/success_bling');
  const { play: playSend } = useSound('ui/submit');
  const { play: playError } = useSound('notification/error');
  const { play: playCompleted } = useSound('ui/success_blip');
  const { play: playExpand } = useSound('ui/radio_select');
  const { play: playPopPupOpen } = useSound('ui/window_open');
  const { play: playPopPupClose } = useSound('ui/window_close');

  return {
    playBlocked,
    playSuccess,
    playSend,
    playError,
    playCompleted,
    playExpand,
    playPopPupOpen,
    playPopPupClose,
  };
};

export default useAppSounds;