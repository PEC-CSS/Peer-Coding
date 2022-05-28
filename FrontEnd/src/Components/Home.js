import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import './Home.css';
import Typist from 'react-typist'
import Zoom from 'react-reveal/Zoom';
function Home() {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const joinRoom = () => {
        if (roomId !== '' && username !== '') {
            navigate(`/editor/${roomId}`, {
                state: {
                    username: username,
                    roomId: roomId
                }
            })
        }
        else {
            toast.error("username and roomId required");
        }
    }

    const createNewRoom = (e) => {
        e.preventDefault();
        setRoomId(v4());
        toast.success('room created');
    }

    const handleInputEnter = (e) => {
        if (e.code == 'Enter') {
            joinRoom();
        }
    }



    return (
        <div className="Home">
            <div className="Title">
                <Typist
                    avgTypingDelay={50}
                    startDelay={1000}
                    cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
                // cursor={{}}
                >
                    Codeboard
                </Typist>

            </div>

            <div className='homewrapper'>
                <Zoom>
                    <div className='formwrapper'>
                        <h4 className="mainLabel">Join Room</h4>
                        <div className="inputGroup">
                            <input
                                type="text"
                                className="inputBox"
                                placeholder="room_id"
                                onChange={(e) => setRoomId(e.target.value)}
                                value={roomId}
                                onKeyUp={handleInputEnter}
                            />
                            <input
                                type="text"
                                className="inputBox"
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                onKeyUp={handleInputEnter}
                            />
                            <button className="btn joinBtn" onClick={joinRoom}>
                                Join
                            </button>
                            <span className="createInfo">
                                If you don't have an invite then create &nbsp;
                                <a
                                    onClick={createNewRoom}
                                    href=""
                                    className="createNewBtn"
                                >
                                    new room
                                </a>
                            </span>
                        </div>
                    </div>
                </Zoom>
            </div>
        </div>

    )
}

export default Home