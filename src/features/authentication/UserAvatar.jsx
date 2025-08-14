import styled from "styled-components";
import { useUser } from "./hooks/useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media (max-width: 768px) {
    gap: 0.8rem;
    font-size: 1.2rem;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);

  @media (max-width: 1024px) {
    width: 3.2rem;
  }

  @media (max-width: 640px) {
    width: 2.8rem;
  }

  @media (max-width: 420px) {
    width: 2.4rem;
  }
`;

const Name = styled.span`
  @media (max-width: 420px) {
    display: none;
  }
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        onError={(e) => {
          console.error("Avatar failed to load:", avatar);
          e.currentTarget.onerror = null;
          e.currentTarget.src = "default-user.jpg";
        }}
      />

      <Name>{fullName}</Name>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
