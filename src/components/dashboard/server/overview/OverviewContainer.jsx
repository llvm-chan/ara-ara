import { Skeleton, Typography, Fade, AppBar, Toolbar, Paper, Grid, Box, IconButton, Tooltip, CardMedia, CardActionArea } from "@material-ui/core"
import { useParams } from "react-router"
import React from "react"
import {getFirestore, doc, onSnapshot} from '@firebase/firestore'
import axios from "axios"
import {
  Edit as EditIcon
} from '@material-ui/icons'

const database = getFirestore()

function OverviewContainer(){
  const {server, instance} = useParams()
  const [server_data, setServerData] = React.useState({
    name: null
  })
  const [minecraft_server_data, setMinecraftServerData] = React.useState()

  React.useEffect(() => {
    const docRef = doc(database, "instances", instance, "servers", server)
    onSnapshot((docRef), (doc) => {
      setServerData(doc.data())
    })
  }, [])
  React.useEffect(() => {
    axios.get('https://api.mcsrvstat.us/2/mc.hypixel.net').then((response) => {
      console.log(response.data)
      setMinecraftServerData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  function getMinecraftMotd(){
    return{__html: minecraft_server_data.motd.html}
  }
  return(
    <React.Fragment>
      <Typography variant="h4">Server Overview</Typography>
      <Paper sx={{mt: 2}}>
        <Grid container direction="row" sx={{p: 2}}>
        <CardMedia id="serverImage" onMouseLeave={() => {
          var image = document.getElementById('overlay')
          image.style.display = 'none'
        }} onMouseOver={() => {
          var image = document.getElementById('overlay')
          image.style.display = ''
        }} sx={{height: '64px', width: '64px'}} style={{marginBottom: 3}} image="https://mc-api.net/v3/server/favicon/mc.hypixel.net">
          <Grid container justifyContent="center" id="overlay" style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'none'}}>
            <IconButton sx={{width: '100%', height: '100%', ":hover":{background: 'none'}}}>
              <EditIcon/>
            </IconButton>
          </Grid>
        </CardMedia>
        <Box sx={{ml: 1}}>
        {server_data.name ? <Fade in={true}><Typography variant="h6">{server_data.name}</Typography></Fade>  : <Skeleton width={200} height={50}></Skeleton>}
        <Grid container direction="row">
        {minecraft_server_data ?         <div style={{marginTop: 3}} dangerouslySetInnerHTML={getMinecraftMotd()} /> : "" }
        <Tooltip title="Edit">
        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
        </Tooltip>

        </Grid>
        </Box>
        </Grid>

      </Paper>
    </React.Fragment>
  )
}


export default OverviewContainer