import Dot, { CustomDotColor } from '@components/Dot/Dot'
import SvgWarningTriangle from '@icons/WarningTriangle'
import { motion } from 'framer-motion'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

import SvgDimensionsIcon from '../../../static/DimensionsIcon'
import { ReplayerState, useReplayerContext } from '../ReplayerContext'
import SessionShareButton from '../SessionShareButton/SessionShareButton'
import { CurrentUrlBar } from './CurrentUrlBar/CurrentUrlBar'
import styles from './SessionLevelBar.module.scss'
import SessionToken from './SessionToken/SessionToken'

const SessionLevelBar = React.memo(() => {
	const { state, events, session, viewport, currentUrl, isLiveMode } =
		useReplayerContext()

	const isLoading =
		(state === ReplayerState.Loading && !events.length) ||
		!viewport ||
		!currentUrl ||
		!session

	return (
		<motion.div
			className={styles.container}
			initial={{ translateY: '-100%' }}
			animate={{ translateY: '0%' }}
			exit={{ translateY: '-100%' }}
		>
			<div className={styles.sessionLevelBarContainer}>
				{isLoading ? (
					<div className={styles.skeletonContainer}>
						<Skeleton count={1} width="100%" height="100%" />
					</div>
				) : (
					<>
						<CurrentUrlBar url={currentUrl ?? ''} />
						{session.excluded ? (
							<SessionToken
								icon={<SvgWarningTriangle />}
								tooltipTitle="The session is not included in search results due to an error on our end."
							>
								<span className={styles.sessionExcluded}>
									Not in Search Results
								</span>
							</SessionToken>
						) : null}
						<SessionToken
							icon={<SvgDimensionsIcon />}
							tooltipTitle="The user's current viewport size in pixels."
						>
							{viewport?.width} x {viewport?.height}
						</SessionToken>
						{isLiveMode ? (
							<SessionToken
								icon={
									<Dot
										pulse={true}
										color={CustomDotColor.RED}
									/>
								}
								tooltipTitle="This session is currently live."
								className={styles.liveIndicator}
							>
								<div className={styles.liveIndicator}>Live</div>
							</SessionToken>
						) : (
							''
						)}
					</>
				)}
			</div>
			<SessionShareButton className={styles.shareButton} />
		</motion.div>
	)
})

export default SessionLevelBar