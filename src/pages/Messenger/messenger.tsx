import React from 'react'
import "./messenger.css"
import DefaultLayout from "../../layout/DefaultLayout";
import Conversation from './Conversation/Conversation';
import TopMessage from './TopMessage/TopMessage';
import ChatOnline from './ChatOnline/ChatOnline';

export default function messenger() {
    return (
        <DefaultLayout>
            <div className='messenger'>

                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                        placeholder='search for friends' className='chatMenuInput'>
                        </input>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <TopMessage/>
                        <TopMessage own={true}/>
                        <TopMessage/>
                        <TopMessage/>
                        <TopMessage own={true}/>
                        <TopMessage/>
                        <TopMessage/>
                        <TopMessage own={true}/>
                        <TopMessage/>
                        <TopMessage/>
                        <TopMessage own={true}/>
                        <TopMessage/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className='chatMessageInput' placeholder='write something...'></textarea>
                        <button className='chatSubmitButton'>Send</button>
                    </div>
                    </div>
                    
                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline/>
                    </div>
                </div>

            </div>
        </DefaultLayout>
    )
}
