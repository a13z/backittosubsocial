import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';

import { ModalImportProps } from 'src/models/modal';


  
function ModalImportTweet(props: ModalImportProps) {
    const { onClose, url, setUrl, open } = props;
    const [ tweet, setTweet ] = React.useState('');

    async function handleOnSearchSubmit(e) {
        e.preventDefault();
    
        // const formData = new FormData(e.currentTarget);
        // const query = formData.get('query');
        console.log('tweet', tweet);
        const results = await fetch('/api/twitter/lookup', {
          method: 'POST',
          body: JSON.stringify({tweet})
        }).then(res => res.json());
    
        setUrl(results.data); 
      }

    const handleClose = () => {
        onClose && onClose();
    };

    // const handleListItemClick = (value: string) => {
    //     onClose(value);
    // };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Import Tweet</DialogTitle>
            <DialogContent>
            <form onSubmit={handleOnSearchSubmit} id="myform">
                <TextField
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                />
            </form>
            <Typography variant="subtitle2" component="div">
                tweet id: {tweet}
             </Typography>
             <Typography variant="subtitle1" component="div">
                tweet lookup: {JSON.stringify(url[0].text)}
             </Typography>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="contained" type="submit" form="myform">
                Load Tweet
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function ModalImport() {
    const [open, setOpen] = React.useState(false);
    const [tweetUrl, setTweetUrl] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // console.log('url', url);
        setOpen(false);
        // setTweetUrl(url);
    };

    return (
        <div>
        <Typography variant="subtitle1" component="div">
            Selected: {JSON.stringify(tweetUrl)}
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
            Import tweet
        </Button>
        <ModalImportTweet
            setUrl={setTweetUrl}
            url={tweetUrl}
            open={open}
            onClose={handleClose}
        />
        </div>
    );
}