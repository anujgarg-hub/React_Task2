import React ,{useState,useEffect}from 'react'
// import { getData, postData } from './FetchService';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import './custom.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { Divider } from '@material-ui/core';

import {useDispatch , useSelector} from 'react-redux' ;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const useStyles = makeStyles({
    root: {
     
        width:500,
        padding:30,
        minWidth: 275,
        margin:20,
        boxShadow:'1px 1px 1px 5px'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


export default function Addtask() {
    const classes = useStyles();
    const [getList, setList] = useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');

    const [getUserName, setUserName] = useState('');   
    const [getTask, setTask] = useState('')
    const [getDate, setDate] = useState(new Date())
    const [getStatus, setStatus] = useState('');
    const [getTaskId , setTaskId] = useState('');
    const [refresh, setrefresh] = useState(false)

    /// Second dilouge

    const [openE, setOpenE] = React.useState(false);

    const handleClickOpenE=(userData)=>{
      console.log('handleClickOpenE',userData);
      setTaskId(userData.id)
      setOpenE(true);
      setUserName(userData.username)
      setTask(userData.task);
      setDate(userData.date);
      setStatus(userData.status);
      
    };

    const dispatch = useDispatch();
    const todo     = useSelector(state=>state.todo)
    var todolist   = Object.values(todo)

    const handleDelete=async(userdelete)=>{

      let body = {id : userdelete.id}
        dispatch({type:'Remove_task',payload:[body.id]})
       setrefresh(!refresh)
    }
  
    const handleCloseE = () => {
      setOpenE(false);
    };

    const handleEdit=async()=>{

        let body = {   username  :  getUserName ,                
            task      : getTask,
            date      : getDate,
            status    : getStatus ,
             id       : getTaskId
          }

      dispatch({type :'Edit_task' , payload:[body.id , body]})
          console.log('editted');
          setrefresh(!refresh)
          
  
      handleCloseE()
    }

 
    const EditDilouge=()=>{
    //  return getUpdateList.map((item)=>{
      return(
        <>                       
      <Dialog
        open={openE}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseE}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Edit Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          <DialogContent>
      <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="First Name"
              value={getUserName}
              autoFocus
              onChange={(e)=>setUserName(e.target.value)}
            />
          </Grid>
        
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="task"
              label="Assigned Task"
              name="task"
              value={getTask}
              autoComplete="task"
              onChange={(e)=>setTask(e.target.value)}

            />
          </Grid>
          <Grid item xs={6}>
          <label>Date</label>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="date"
              // label="Date"
              type="date"
              id="date"
              value={getDate}
              autoComplete="date"
              onChange={(e)=>setDate(e.target.value)}

            />
          </Grid>

          <Grid item xs={6}>
          <Grid item xs={6} >
           
            <label>Status</label>
            </Grid>
            <Grid item xs={6} >
      <GreenRadio
      checked={getStatus === 'Yes'}
      onChange={handleChange}
      value="Yes"
      name="radio-button-demo"
      inputProps={{ 'aria-label': 'A' }}
    />Yes
    <Radio     
      checked={getStatus === 'No'}
      onChange={handleChange}
      value="No"
      name="radio-button-demo"
      inputProps={{ 'aria-label': 'C' }}/>No
          </Grid>
          </Grid>
         
        </Grid>
      </DialogContent>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color="primary">
            Edit
          </Button>
         
        </DialogActions>
      </Dialog>
    
        </>
      ) 
    //  })
      
    
    }


    ////

  const handleSubmit=()=>{

      let body = {username  :  getUserName ,                
                  task      : getTask,
                  date      : getDate,
                  status    : getStatus ,
                   id       : new Date().valueOf()
                }

            dispatch({type :'Add_task' , payload:[body.id , body]})

       clearData();
       handleClose();
    //    fetchData();
  }  

  const clearData=()=>{

    setUserName('')
    setTask('')
    setDate('')
    setStatus('')
  } 


  const handleChange = (event) => {
    setStatus(event.target.value);
    setSelectedValue(event.target.value);
  };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleDilouge=()=>{
      return(
        <>
         <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Task"}</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(e)=>setUserName(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="task"
                label="Assigned Task"
                name="task"
                autoComplete="task"
                onChange={(e)=>setTask(e.target.value)}

              />
            </Grid>
            <Grid item xs={6}>
            <label>Date</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="date"
                // label="Date"
                type="date"
                id="date"
                value={getDate}
                autoComplete="date"
                onChange={(e)=>setDate(e.target.value)}

              />
            </Grid>

            <Grid item xs={6}>
            <Grid item xs={6} >
             
              <label>Status</label>
              </Grid>
              <Grid item xs={6} >
        <GreenRadio
        checked={selectedValue === 'Yes'}
        onChange={handleChange}
        value="Yes"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
       
        checked={selectedValue === 'No'}
        onChange={handleChange}
        value="No"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
      />No
            </Grid>
            </Grid>
           
          </Grid>
        </DialogContent>
        <DialogActions>
         
          <Button style={{position:'relative',right:260,backgroundColor:'#273c75',color:'#fff',padding:10,borderRadius:20,boxShadow:'10px 15px 10px 15px'}} onClick={handleSubmit} color="primary">
            Submit
          </Button>
         
        </DialogActions>
      </Dialog>
        </>
      )
    }

    const fetchData = async() =>{
        // let result  = await getData('Task/TaskGet')
        // console.log('result.data',result.data);
        // console.log('result.data',result.data[0]._id);

        // setList(result.data)
    }

    const fillTask=()=>{
        return todolist.map((item)=>{
            return(

                <Card className={classes.root}>
                      <div>
                        <div style={{display:'flex',justifyContent:"space-between"}}>
                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                        <b><span style={{color:'#e84118'}}>  Name </span> </b>
                        </Typography>

                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                         {item.username}
                        </Typography>
                        </div>

                        <div style={{display:'flex',justifyContent:"space-between"}}>
                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                        <b><span style={{color:'#fbc531'}}>  Assigned Task </span> </b>
                        </Typography>

                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                         {item.task}
                        </Typography>
                        </div>

                        <div style={{display:'flex',justifyContent:"space-between"}}>
                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                        <b><span style={{color:'#44bd32'}}> Assigned Date </span>  </b>
                         </Typography>

                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                         {item.date}
                        </Typography>
                        </div> 

                        <div style={{display:'flex',justifyContent:"space-between"}}>
                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                        <b><span style={{color:'#0097e6'}}> Status </span>  </b>
                        </Typography>

                        <Typography  variant="h5" component="h2" color="textSecondary" gutterBottom>
                         {item.status}
                        </Typography>
                        </div> 
                       
                      </div>
                      <CardActions style={{display:'flex',justifyContent:'space-around'}}>
                        <Button size="small"
                         onClick={()=>handleClickOpenE(item)}
                          style={{backgroundColor:'#273c75',color:'#fff'}}>Edit</Button>

                        <Button size="small" 
                        onClick={()=>handleDelete(item)} 
                        style={{backgroundColor:'#4cd137',color:'#fff'}}>Delete</Button>
                      </CardActions>
                    </Card>
                  );
        })
        
    }

    useEffect(()=>{
        //    fetchData(); 
    },[])


    return (
        <div  className="bg">
            <center>
                <h1 style={{color:'#2f3640'}}> Assign Task </h1>
                <Button size="small" 
                class="btnb" 
                onClick={handleClickOpen}
                >Add toDo </Button>
                {handleDilouge()}
                <div style={{ display:'flex',
                         alignItems:'center',
                           justifyContent:'center',flexWrap:'wrap'}}>
                {fillTask()}
                </div>
                {EditDilouge()}
            </center>
        </div>
    )
}
