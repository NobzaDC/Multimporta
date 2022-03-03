import styled from "styled-components"

export const Section = styled.section`
    width: 90%;
	margin-top: ${props => props.margin || '1.3rem'};
	margin-left: 5%;
	margin-right: 5%;
	border-radius: 13px;
	border: 1px solid ${props => props.bordered === 'no-bordered' ? 'transparent' : 'lightgray'};
	box-sizing: border-box;
	padding: ${props => props.padding || '20px 30px'};
	background: ${props =>  props.background || 'transparent'};
	min-height: ${props => props.minHeight || '0'};
	overflow: auto;
	${props => props.maxHeight ? `max-height:${props.maxHeight}` : ''};

	@media screen and (max-width: 800px) {
		border: 0px;
	}

	::-webkit-scrollbar {
		background-color: transparent;
		width: 0px;
	}
` 