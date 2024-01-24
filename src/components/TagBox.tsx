import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface TagBoxProps {
    value: string;
    onChange: (tag: string) => void;
  }
  
const names = [
  'Academic',
  'Gaming',
  'Memes', 
  'Music', 
  'News', 
  'Sports', 
  'Tech', 
  'Travel', 
  'TV & Movies', 
  'Others'
];

const TagBox: React.FC<TagBoxProps> = ({ value, onChange }) => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>(value.split(','));

    const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
      const {
        target: { value: selectedValues },
      } = event;
  
      setSelectedTags(Array.isArray(selectedValues) ? selectedValues : []);
  
      const selectedTagsString = Array.isArray(selectedValues) ? selectedValues.join(',') : '';
      onChange(selectedTagsString);
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 196, marginTop: 3 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedTags}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) =>
                Array.isArray(selected) && selected.length > 0
                ? selected.slice(1).join(', ')
                : ''
              }
            >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedTags.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };
export default TagBox;