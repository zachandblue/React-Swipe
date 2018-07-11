import styled from 'styled-components';
import { elevation, transition, colors } from 'Utilities';

export const Card = styled.div`
  background: white;
  border-radius: 5px;
  padding: 15px;

  width: 70vw;
  max-width: 600px;
  margin: auto;

  color: ${colors.black};
  ${elevation[4]};
  ${transition({
    property: 'box-shadow'
  })};

  @media (max-width: 460px) {
    width: 100vw;
    margin-top: 0;
    box-shadow: none;
  }
`;
