import { useState } from 'react';
import styled from 'styled-components';
import search from '../images/search.svg';

const Container = styled.form`
  margin-left: 180px;
  padding: 25px;
`;
const InputWrapper = styled.div`
  position: relative;
  width: 690px;
  height: 44px;
  margin-bottom: 50px;
`;
const Input = styled.input`
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  box-shadow: none;
  color: #202124;
  font-size: 16px;
  padding: 0 18px;
  outline: none;
  margin-left: -18px;
  width: 100%;
  height: 100%;

  &:hover {
    border-color: transparent;
    box-shadow: rgba(32, 33, 36, 0.28) 0 1px 6px;
  }
`;
const Button = styled.button`
  display: none;
`;
const Results = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 25px;
  width: 652px;
`;
const Result = styled.li``;
const Link = styled.a`
  text-decoration: none;
  width: fit-content;

  &:hover {
    h3 {
      text-decoration: underline;
    }
  }
`;
const Title = styled.h3`
  margin: 0;
  font-weight: 400;
  color: #1a0dab;
  font-size: 20px;
  line-height: 1.3;
  margin: 0 0 3px;
  padding: 4px 0 0;
`;
const URL = styled.span`
  margin: 0;
  color: #202124;
  font-size: 14px;
  line-height: 1.3;
`;
const Snippet = styled.p`
  margin: 0;
  color: #4d5156;
  font-size: 14px;
  line-height: 22.12px;
`;
const Icon = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 15px;
`;

export default function Form() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `http://api.serpstack.com/search?access_key=${process.env.REACT_APP_SERPSTACK_API}&type=web&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.organic_results));
  };

  const handleSearch = () => {
    const btn = document.getElementById('btn');
    btn.click();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputWrapper>
        <Input type="text" onChange={(e) => setQuery(e.target.value)} />
        <Icon src={search} alt="Search" onClick={() => handleSearch()} />
      </InputWrapper>
      <Button id="btn" type="submit" />
      <Results>
        {results.map((result) => {
          const { title, url, snippet } = result;
          return (
            <Result key={title}>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <URL>{url}</URL>
                <Title>{title}</Title>
              </Link>
              <Snippet>{snippet}</Snippet>
            </Result>
          );
        })}
      </Results>
    </Container>
  );
}
