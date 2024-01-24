import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Select } from '@mui/joy';
import { Option } from '@mui/joy';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

interface CreatePostProps {
  title: string;
  type: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePost({ title, type, name, value, onChange }: CreatePostProps) {
console.log(value)
    const [text, setText] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    return (
        <FormControl defaultValue="" required>
            
                <Typography fontWeight="bold" sx={{ whiteSpace: 'nowrap', marginTop: '20px', marginBottom: '0px' }}>
                    {title}
                </Typography>
            
            <TextField placeholder="Write your name here" type={type} name={name} value={value} onChange={onChange} />
            <HelperText />
        </FormControl>
    );
}

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;