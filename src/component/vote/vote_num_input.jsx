import React ,{useState}from 'react';
const VoteNumInput = (props) => {
    const [num, setNum] = useState(100);
    return (
        <div className='vote_submit_box'>
            <div className='vote_submit_mask'></div>
            <div className='vote_submit_dialog'>
                <div className='vote_submit_header'>
                    投票
                </div>
                <div className='vote_submit_body'>
                    <input type="text" placeholder='输入投票数量' value={ num } onChange={ (e)=>setNum(e.target.value) }/>
                </div>
                <div className='vote_submit_footer'>
                    <a onClick={props.cancelShowVoteNumInput}>取消</a>
                    <a onClick={()=>props.submitVote(num)}>提交</a>
                </div>
            </div>
        </div>
    )
};
export default VoteNumInput;