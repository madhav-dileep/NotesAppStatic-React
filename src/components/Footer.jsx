import React from 'react'
import NotesIcon from '@mui/icons-material/Notes';
import { Button, Fab, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
    return (
        <div className='footerStyle d-flex flex-wrap justify-content-evenly bg-dark text-light py-5 rounded-top-2'>
            <div style={{ width: '400px' }} className='information p-2 '>
                <div style={{ fontSize: '1rem' }} className='d-flex'>
                    <NotesIcon style={{ fontSize: '1.5rem' }} className='me-2' />
                    <h3 style={{ fontSize: '1.8rem' }} className='fw-bold'>Notes App</h3>
                </div>
                <p style={{ fontSize: '0.8rem' }}>Designed and built with all the love in the world by the Madhav</p>
                <p style={{ fontSize: '0.8rem' }}>Code licensed, docs CC BY 3.0.</p>
                <p style={{ fontSize: '0.8rem' }}>Currently v1.0.1.</p>
            </div>
            <div>
                <h5 style={{fontSize:'1.5rem'}} className='fw-bold'>Links</h5>
                <ul className='list-unstyled text-white ms-1'>
                    <li><a className='text-decoration-none text-white' href="">React</a></li>
                    <li><a className='text-decoration-none text-white' href="">Material UI</a></li>
                    <li><a className='text-decoration-none text-white' href="">Bootstrap</a></li>
                </ul>
            </div>
            <div>
                <h5 style={{fontSize:'1.5rem'}} className='fw-bold'>Contact Us</h5>
                <div className='d-flex'>
                    <TextField className='bg-light rounded fs-1 me-2' label="Email" variant="filled"></TextField>
                    <Fab sx={{zIndex:0}} color="primary" aria-label="add">
                        <SendIcon/>                    
                    </Fab>
                </div>
            </div>

            <div></div>

        </div>
    )
}

export default Footer