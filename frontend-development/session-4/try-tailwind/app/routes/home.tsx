import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import CustomButton from '../components/Button';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { NativeSelect, Slider } from '@mantine/core';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div>
      {/* tailwind usage */}
      <div className="bg-abcdef w-4 h-4 m-8"></div>
      <h1 className="font-primary">This is title with roboto</h1>

      {/* mui usage */}
      <Button variant="contained" color="success">
        Success
      </Button>
      <Rating name="size-large" defaultValue={2} size="large" />

      {/* custom button from mui */}
      <CustomButton variant="contained">Hello world</CustomButton>

      {/* mantine usage */}
      <NativeSelect
        label="Input label"
        description="Input description"
        data={['React', 'Angular', 'Vue']}
      />
      <Slider
        className="m-auto p-4 w-[300px]"
        color="blue"
        defaultValue={40}
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </div>
  );
}
