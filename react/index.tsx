import * as React from 'react'
import { injectIntl } from 'react-intl'
import { PaymentModel } from 'gocommerce.admin-gateway'

interface PaymentFormProps {
  intl: any
}

interface PaymentFormState {}

class PaymentFormComponent extends React.PureComponent<PaymentFormProps, PaymentFormState> {
  render() {
    const { intl } = this.props
    const intlPrefix = 'admin.payment.paypal'
    const optionsInstallments = new Array(12).fill(0).map(function(_, i) {
      const curr = i + 1
      return {
        "value": curr,
        "label": `${curr}x`
      }
    })
    const paymentSchema = {
      "title": "PayPal",
      "properties": {
        "boxGeneral": {
          "title": intl.formatMessage({ id: `${intlPrefix}.boxGeneral` }),
          "id": "general",
          "fields": {
            "rule.isDefault": {
              "type": "boolean",
              "widget": "hidden",
              "title": "isDefault"
            },
            "paymentAlias": {
              "type": "string",
              "widget": "hidden",
              "title": "paymentAlias"
            },
            "interestRate": {
              "type": "string",
              "widget": "hidden",
              "title": "interestRate"
            },
            "creditCardActive": {
              "type": "boolean",
              "widget": "toggle",
              "title": intl.formatMessage({ id: `${intlPrefix}.creditCardActive` })
            }
          }
        },
        "boxApplicationSetup": {
          "title": intl.formatMessage({ id: `${intlPrefix}.boxApplicationSetup` }),
          "id": "applicationSetup",
          "fields": {
            "affiliation.configuration.merchantUsername": {
              "type": "string",
              "widget": "text",
              "title": "Merchant Username",
              "validate": {
                "required": true
              }
            },
            "affiliation.configuration.merchantPassword": {
              "type": "string",
              "widget": "text",
              "title": "Merchant Password",
              "validate": {
                "required": true
              }
            },
            "affiliation.configuration.signature": {
              "type": "string",
              "widget": "text",
              "title": "Signature",
              "validate": {
                "required": true
              }
            }
          }
        }
      },
      "additionalData": {
        "requireAuthorize": false,
        "description": intl.formatMessage({ id: `${intlPrefix}.additionalData.description` })
      },
      "initialValues": {
        "paymentAlias": "paypal",
        "creditCardActive": false,
      }
    }

    return <PaymentModel payment_id="paypal" paymentSchema={paymentSchema} />
  }
}

export default injectIntl(PaymentFormComponent)
