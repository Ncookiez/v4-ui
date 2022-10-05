import { getExchange } from '@constants/config'
import { ExternalLink, Modal, ModalProps, ModalTitle } from '@pooltogether/react-components'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import { CHAIN_ID } from '@pooltogether/wallet-connection'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface SwapTokensModalProps extends Omit<ModalProps, 'children'> {
  chainId: number
  tokenAddress: string
}

export const SwapTokensModal = (props: SwapTokensModalProps) => {
  const { chainId, tokenAddress } = props

  const { t } = useTranslation()

  const { url, title } = getExchange(chainId, tokenAddress)

  return (
    <Modal
      isOpen={Boolean(props.isOpen)}
      paddingClassName='px-2 xs:px-8 py-10'
      maxWidthClassName='sm:max-w-md'
      label={t('getTokensModal', 'Get Tokens - modal')}
      closeModal={props.closeModal}
    >
      <div className='flex flex-col'>
        <ModalTitle
          chainId={chainId}
          title={t('swapTokensOnNetwork', 'Swap tokens on {{networkName}}', {
            networkName: getNetworkNiceNameByChainId(chainId)
          })}
        />

        <p className='text-inverse opacity-60 mt-4 mb-6'>
          {t(
            'makeUseOfSwapService',
            'Make use of one of these services to swap the tokens in your wallet for another token'
          )}
        </p>
        <ul className='space-y-2'>
          <ExternalLink className='text-xl' href={url}>
            {title}
          </ExternalLink>
        </ul>
      </div>
    </Modal>
  )
}

SwapTokensModal.defaultProps = {
  chainId: CHAIN_ID.mainnet
}
