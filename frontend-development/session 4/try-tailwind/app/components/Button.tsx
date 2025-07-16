import MuiButton from '@mui/material/Button';

export default function Button({ children, variant }: { children: any, variant: any }) {
  return (
    <div className="ml-4">
      <MuiButton variant={variant as any}>{children}</MuiButton>
    </div>
  )
}
