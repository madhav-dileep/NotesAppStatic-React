import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Fab, IconButton, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function App() {

  const [show, setShow] = useState(false)
  const [hideText, setHideText] = useState(false)
  const [view, setView] = useState(false)
  const [open,setOpen] = useState(false)
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    favourite: false
  })
  const [notes, setNotes] = useState([])

  const handleShow = () => { setShow(true) }
  
  const handleOpen = (note) => {
    setInputs({
      ...inputs,
      title : note.title,
      content : note.content
    })
    console.log(inputs);
    
    setOpen(true)
  }

  const handleClose = () => { setShow(false),setOpen(false) }

  // console.log(inputs.title, inputs.content);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSaveNote = () => {
    const date = new Date().toLocaleString('en-US',{dateStyle:'long',timeStyle:'short'})
    console.log(date);
    // setInputs({...inputs,timeStamp:date})
    if (inputs.title && inputs.content) 
      { const existingNoteIndex = notes.findIndex(item => item.title === inputs.title); 
        if (existingNoteIndex !== -1) { 
          const updatedNotes = [...notes]; 
            updatedNotes[existingNoteIndex] = { ...updatedNotes[existingNoteIndex], content: inputs.content, timeStamp:date }; 
            setNotes(updatedNotes); 
          } else { 
            setNotes([...notes, { ...inputs, timeStamp: date }]);
          } 
        setInputs({ title: '', content: '', favourite: false, timeStamp:'' }); 
        handleClose(); 
      } else { 
            alert("Not Enough Data"); 
      }
  }

  const handleFavourite = (note) => {
    const updatedNotes = notes.map(item => item.title === note.title ? { ...item, favourite: !item.favourite } : item ); 
    setNotes(updatedNotes); 
    // console.log(`Button clicked: ${note.favourite}`); 
    // console.log(updatedNotes);
  }

  const handleDelete = (note) => {
    setNotes(notes.filter(item => item.title != note.title))
  }

  useEffect(() => {
  }, [notes])

  // console.log(notes);


  return (

    <>
      <Header />
      <div className='bg-dark-subtle position-relative'>
        <div className="notesBody container " style={{ minHeight: '100vh' }}>
          {/* Title */}
          <div className='d-flex justify-content-between pt-4 px-3'>
            <h2>My Notes</h2>
            <div className='d-flex align-items-center justify-content-evenly'>
              <Tooltip title='List View'>
                <IconButton onClick={() => setView(false)} color='primary'>
                  <ViewListIcon style={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title='Grid View'>
                <IconButton onClick={() => setView(true)} color='primary'>
                  <ViewModuleIcon style={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <hr />
          {/* Contents */}
          <div style={{position:'relative'}} className='justify-content-end'>
            <IconButton style={{position:'absolute',right:0,top:0,color:'orange'}} onClick={() => setHideText(true)} aria-label="hide">
              <VisibilityOffIcon hidden={hideText} />
              {/* <VisibilityIcon hidden={!hideText} onClick={() => setHideText(false)} /> */}
            </IconButton>
            <IconButton style={{position:'absolute',right:0,top:0,color:'orange'}} onClick={() => setHideText(false)} aria-label="hide">
              {/* <VisibilityOffIcon hidden={hideText} onClick={() => setHideText(true)} /> */}
              <VisibilityIcon hidden={!hideText} />
            </IconButton>
          </div>
          <div style={{ width: "100%",paddingTop:30 }} className=' contents d-flex flex-wrap align-items-center'>
            {
              view ?
                notes?.length > 0 ? 
                //Grid View
                  notes?.map(note => (
                    <Card sx={{ maxWidth: '325px', minHeight: '250px', cursor: 'pointer', marginX: '20px', marginY: '20px' }}>
                      <CardHeader
                        title={note?.title}
                        subheader={note.timeStamp}
                      >
                      </CardHeader>
                      <CardContent
                        onClick={()=>handleOpen(note)}
                        sx={{ minHeight: '100px', maxHeight: '100px', overflow: 'hidden',paddingRight:'10px' }}>
                        <Typography
                          hidden={hideText}
                          variant="body2"
                          sx={{ color: 'text.secondary' }}>
                          {note?.content}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton onClick={() => handleFavourite(note)} aria-label="add to favorites">
                          {
                            note.favourite ?
                              <FavoriteIcon sx={{ color: 'red' }} />
                              :
                              <FavoriteIcon />
                          }

                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(note)} aria-label="delete" >
                          <DeleteIcon sx={{ color: 'black' }} />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))

                  :
                  <div className='text-center w-100'>
                    No new Notes
                    {/* Grid View */}
                  </div>

                :
                notes?.length > 0 ?
                // List View
                  notes?.map(note => (

                    <div key={note?.title} style={{ minWidth: '100%', width: '100%', flex: 'column' }} className=' border px-4 p-4 my-3 bg-light rounded-5'>
                      <h5 onClick={()=>handleOpen(note)} style={{ fontSize: '1.5rem',cursor:"pointer" }} className='fw-normal'>{note?.title}</h5>
                      <h6 style={{ fontSize: '0.8rem' }} className='fw-normal'>{note?.timeStamp}</h6>
                      <p onClick={()=>handleOpen(note)} hidden={hideText} style={{ minWidth: "90%", width: "90%",cursor:"pointer" }} className='ms-3'>{note?.content}</p>
                      <IconButton onClick={() => handleFavourite(note)} aria-label="add to favorites">
                        {
                          note.favourite ?
                            <FavoriteIcon sx={{ color: 'red' }} />
                            :
                            <FavoriteIcon />
                        }
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(note)} aria-label="delete" >
                        <DeleteIcon sx={{ color: 'black' }} />
                      </IconButton>
                    </div>

                  ))

                  :
                  <div className='text-center w-100'>
                    No new Notes
                  </div>
            }
            {/* Add Button */}
          <div style={{ position:"fixed",right:50, bottom:50 }} className=''>
            <Tooltip title='Add a New Note' placement='left'>
              <Fab pos sx={{padding:"40px"}} color="secondary" aria-label="add">
                <Add  onClick={handleShow} />
              </Fab>
            </Tooltip>
          </div>

          </div>
          
        </div>
      </div>
      <Footer />

      {/* Modal for adding and editing */}
      <Modal
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }}
        open={show}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className=''
      >
        <Box sx={{ minWidth: "50%", minHeight: 500, backgroundColor: 'white', color: 'black', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  borderRadius: '5%' }} className="p-4 p-md-4">
          <TextField
            sx={{ width: "100%" }}
            variant='filled'
            label='Title'
            onChange={handleChange}
            value={inputs?.title || ""}
            name='title'></TextField>
          <textarea onChange={handleChange} value={inputs?.content || ""} name='content' style={{ minWidth: "100%", minHeight: 400, padding: 10, border: "none" }} className='mt-2' placeholder='Enter your notes'></textarea>
          <Stack spacing={2}>
            <Button onClick={handleSaveNote} variant='outlined' className='me-2 bg-primary text-light px-4 py-2'>Save</Button>
            <Button onClick={handleClose} variant='outlined' className='px-4 py-2'>Close</Button>
          </Stack>
        </Box>
      </Modal>

      {/* Modal for Viewing */}
      <Modal
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        
      >
        <Box sx={{ minWidth: "50%", minHeight: 500, backgroundColor: 'white', color: 'black', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',  borderRadius: '5%' }} className="p-4 p-md-4">
          <TextField
            sx={{ width: "100%" }}
            variant='filled'
            label='Title'
            readOnly={true}
            disabled
            onChange={handleChange}
            value={inputs?.title || ""}
            name='title'></TextField>
          <textarea disabled readOnly={true} onChange={handleChange} value={inputs?.content} name='content' style={{ minWidth: "100%", minHeight: 400, padding: 10, border: "none" }} className='mt-2' placeholder='Enter your notes'></textarea>
          <Stack spacing={2}>
            <Button onClick={handleShow} variant='outlined'className='me-2 bg-primary text-light px-4 py-2'>Edit</Button>
            <Button onClick={handleClose} variant='outlined' className='px-4 py-2'>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </>

  )
}

export default App
