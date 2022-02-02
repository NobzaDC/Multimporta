import styled from "styled-components";
import * as Color from 'helpers/colorPalette/Index'


export const FontAwesomeIcon = styled.i.attrs({ className: "fas" })`
    color: ${props => props.color || Color.BLACK};
    font-size: ${props => props.font_size || '1rem'};
`;