import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material';

const StyledIconContainer = styled('div')({
  width: '52px',
  height: '52px',
  margin: '8px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: '#2F3136',
  cursor: 'pointer',
  transition: 'background-color 0.2s, transform 0.2s',
  '&:hover': {
    backgroundColor: '#7770d6',
    transform: 'scale(1.1)',
  },
});

const StyledPeopleIcon = styled(PeopleIcon)({
  color: 'white',
  fontSize: '40px',
});

export const ServerIcons = () => {
  return (
    <StyledIconContainer>
      <StyledPeopleIcon />
    </StyledIconContainer>
  );
};
