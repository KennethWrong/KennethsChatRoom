import React from 'react'


function Friendbar(props){

    return(
        <section className='friendbar'>
            <div className='friendbar-div'>
                <h3 className="friendonline">Friends online</h3>
                <div className="innerfriendonline">
                    <ul className="responsive-p">
                    <li>John</li>
                    <li>Simon</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Friendbar