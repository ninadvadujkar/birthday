import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNameContext } from '../../contexts/user-name.context';
import './Welcome.scss';

const Welcome = () => {
  const navigate = useNavigate();
  const { userName, handleChangeUserName } = useContext(UserNameContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/whoopwhoop');
  };

  return (
    <div className="container">
      <div className="welcome-flex-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label htmlFor="name" style={{ color: '#fff' }}>Enter your name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="name"
                placeholder="Your beautiful name goes here!"
                value={userName}
                onChange={(evt) => handleChangeUserName(evt.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Let's goooo!</button>
          </form>
        </div>
        <div className="note-container">
          <div>Note: Please provide microphone permission on the next screen. The app requires this permission so that you can enjoy it to the fullest! Don't worry, it does not store any information 😊</div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
