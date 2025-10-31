"use client";

import Script from "next/script";
import "./styles.css";

export default function Cielo3DSPage() {
  return (
    <>
      <Script src="/app.js" strategy="lazyOnload" />

      <div className="cielo-container">
        <h1 className="cielo-title">Cielo 3DS - Autenticação</h1>

        <div className="cielo-tabs">
          <button className="cielo-tab active" data-tab="sandbox">
            Sandbox
          </button>
          <button className="cielo-tab" data-tab="production">
            Produção
          </button>
        </div>

        {/* Sandbox Tab */}
        <div id="tab-sandbox" className="tab-content active">
          <div className="cielo-card">
            <div className="field-group">
              <label htmlFor="sandbox-card-number">Número do Cartão</label>
              <input
                type="text"
                id="sandbox-card-number"
                placeholder="4000000000002503"
                defaultValue="4000000000002503"
              />
              <div className="info-text">
                Use cartões de teste da Cielo para sandbox
              </div>
            </div>
            <div className="card-type-toggle">
              <button className="toggle-btn active" data-type="debit">
                Débito
              </button>
              <button className="toggle-btn" data-type="credit">
                Crédito
              </button>
            </div>
            <button id="btn-sandbox-run" className="btn-primary">
              Autenticar 3DS
            </button>
          </div>
        </div>

        {/* Production Tab */}
        <div id="tab-production" className="tab-content">
          <div className="cielo-card">
            <div className="field-group">
              <label htmlFor="prod-card-number">Número do Cartão</label>
              <input
                type="text"
                id="prod-card-number"
                defaultValue="5364875183766348"
              />
            </div>
            <div className="cielo-row">
              <div className="field-group">
                <label htmlFor="prod-card-month">Mês</label>
                <input
                  type="number"
                  id="prod-card-month"
                  defaultValue="10"
                  min="1"
                  max="12"
                />
              </div>
              <div className="field-group">
                <label htmlFor="prod-card-year">Ano</label>
                <input type="number" id="prod-card-year" defaultValue="2034" />
              </div>
            </div>
            <div className="field-group">
              <label htmlFor="prod-card-cvv">CVV</label>
              <input
                type="text"
                id="prod-card-cvv"
                defaultValue="009"
                maxLength={4}
              />
            </div>
            <div className="field-group">
              <label htmlFor="prod-card-holder">Portador</label>
              <input
                type="text"
                id="prod-card-holder"
                defaultValue="Ryan M F Eloy"
              />
            </div>
            <div className="card-type-toggle">
              <button className="toggle-btn active" data-type="debit">
                Débito
              </button>
              <button className="toggle-btn" data-type="credit">
                Crédito
              </button>
            </div>
            <button id="btn-prod-run" className="btn-primary">
              Autenticar 3DS
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div id="result-section" className="result-section cielo-card">
          <h2>Resultado da Autenticação</h2>
          <div className="result-json" id="result-json">
            Aguardando autenticação...
          </div>
          <button className="btn-copy" id="btn-copy-result">
            Copiar JSON
          </button>
        </div>
      </div>

      {/* bpmpi hidden inputs */}
      <input
        id="bpmpi_environment"
        className="hidden bpmpi_environment"
        type="hidden"
      />
      <input
        id="bpmpi_accesstoken"
        className="hidden bpmpi_accesstoken"
        type="hidden"
      />
      <input
        id="bpmpi_referenceid"
        className="hidden bpmpi_referenceid"
        type="hidden"
      />
      <input
        id="bpmpi_ordernumber"
        className="hidden bpmpi_ordernumber"
        type="hidden"
      />
      <input
        id="bpmpi_totalamount"
        className="hidden bpmpi_totalamount"
        type="hidden"
      />
      <input
        id="bpmpi_currency"
        className="hidden bpmpi_currency"
        type="hidden"
      />
      <input
        id="bpmpi_installments"
        className="hidden bpmpi_installments"
        type="hidden"
      />
      <input
        id="bpmpi_cardnumber"
        className="hidden bpmpi_cardnumber"
        type="hidden"
      />
      <input
        id="bpmpi_cardexpirationmonth"
        className="hidden bpmpi_cardexpirationmonth"
        type="hidden"
      />
      <input
        id="bpmpi_cardexpirationyear"
        className="hidden bpmpi_cardexpirationyear"
        type="hidden"
      />
      <input
        id="bpmpi_auth"
        className="hidden bpmpi_auth"
        type="hidden"
        defaultValue="true"
      />
      <input
        id="bpmpi_merchant_url"
        className="hidden bpmpi_merchant_url"
        type="hidden"
      />
    </>
  );
}
