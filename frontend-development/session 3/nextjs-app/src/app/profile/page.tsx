import ProfileHeading from "./components/ProfileHeading";

interface Props {
  name: string;
  age: number;
}

export default function Profile(props: Props) {
  const { name, age } = props;

  return (
    <div>
      <ProfileHeading />
      <div>Name: {name}</div>
      <div>Age: {age}</div>
    </div>
  )
}
