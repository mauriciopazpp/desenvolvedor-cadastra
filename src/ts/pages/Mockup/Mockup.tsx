import React, { useState } from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Accordion from '../../components/Accordion';
import ProductCard from '../../components/ProductCard';
import Base from '../../layouts/Base';

const handleClick = () => {
  console.log('Botão clicado.');
};

const Mockup: React.FC = () => {
  const [_, setIsAmareloChecked] = useState(false);
  const [isAzulChecked, setIsAzulChecked] = useState(false);
  const [isBrancoChecked, setIsBrancoChecked] = useState(false);

  return (
    <Base>
      <div className="mockup-page">
        <br />
        <h2>Mockup page elements</h2>
        <br />
        <h1>HEADINGS</h1>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <hr />
        <h1>Paragraph</h1>
        <p>Este é um parágrafo de exemplo. <a href="#">Este é um link</a>.</p>

        <hr />
        <h1>List</h1>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>

        <hr />
        <h1>Checkboxes</h1>
        <div className="checkboxes">
          <Checkbox
            id="checkbox-1"
            label="Amarelo"
            checked={true}
            onChange={setIsAmareloChecked}
          />
          <Checkbox
            id="checkbox-2"
            label="Azul"
            checked={isAzulChecked}
            onChange={setIsAzulChecked}
          />
          <Checkbox
            id="checkbox-3"
            label="Branco"
            checked={isBrancoChecked}
            onChange={setIsBrancoChecked}
          />
        </div>

        <hr />
        <h1>Buttons</h1>
        <div className="flex">
          <Button label="Botão Primário" onClick={handleClick} variant="primary" />
          <Button label="Botão Secundário" onClick={handleClick} variant="secondary" />
          <Button label="Botão Terciário" onClick={handleClick} variant="terciary" />
        </div>
        <div>
          <br />
          <h6 className='heading-filter'>TAMANHOS</h6>
          <div className="flex sizes-filter">
            <Button label="P" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="M" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="G" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="GG" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="U" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="36" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="38" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="40" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="36" onClick={handleClick} variant="terciary" extraClasses="square" />
            <Button label="40" onClick={handleClick} variant="terciary" extraClasses="square" />
          </div>
        </div>
        <div>
          <br />
          <div className="btn-group">
            <Button label="APLICAR" onClick={handleClick} variant="secondary" extraClasses='btn-no-border' />
            <Button label="LIMPAR" onClick={handleClick} variant="terciary" />
          </div>
        </div>
        <hr />
        <h1>Accordion</h1>
        <Accordion title="FAIXA DE PREÇO">
          <div className="checkboxes">
            <Checkbox
              id="checkbox-4"
              label="R$ 0 - R$ 50"
              checked={false}
              onChange={() => { }}
            />
            <Checkbox
              id="checkbox-5"
              label="R$ 50 - R$ 100"
              checked={false}
              onChange={() => { }}
            />
            <Checkbox
              id="checkbox-6"
              label="R$ 100 - R$ 200"
              checked={false}
              onChange={() => { }}
            />
          </div>
        </Accordion>
        <hr />
        <h1>Product Card</h1>
        <div className="product-list-page list-type-1">
          <ProductCard
            product={{
              id: "2",
              name: "Saia em couro",
              price: 398,
              parcelamento: [5, 30],
              color: "Preto",
              image: "/img/img_3.png",
              size: ["G", "40"],
              date: "1996-12-17"
            }}
          />
          <ProductCard
            product={{
              id: "2",
              name: "Saia em couro",
              price: 398,
              parcelamento: [5, 30],
              color: "Preto",
              image: "/img/img_3.png",
              size: ["G", "40"],
              date: "1996-12-17"
            }}
          />
          <ProductCard
            product={{
              id: "2",
              name: "Saia em couro",
              price: 398,
              parcelamento: [5, 30],
              color: "Preto",
              image: "/img/img_3.png",
              size: ["G", "40"],
              date: "1996-12-17"
            }}
          />
        </div>
      </div>
    </Base>
  );
};

export default Mockup;
