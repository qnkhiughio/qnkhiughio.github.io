import React, { useState, useEffect } from "react"
import { useSprings, animated, to as interpolate } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import * as utils from "./utils"
import "../styles/Deck.css"
import Home from "./Home" // import your Home component


export default function Deck({ cards }) {
  const [small, setSmall] = useState("")
  const [large, setLarge] = useState("")
  const [gone] = useState(() => new Set())
  const [showHome, setShowHome] = useState(false)
  const [props, api] = useSprings(cards.length, (i) => ({
    ...utils.to(i),
    from: utils.from(i)
  }))

  useEffect(() => {
    const screenWidth = window.innerWidth
    if (screenWidth>1000) {
      setLarge("480px")
      setSmall("360px")
    }
    else {
      setSmall("192px")
      setLarge("384px")
    }
  }, []);

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2
    if (!active && trigger) gone.add(index)
    api.start((i) => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0)
      const scale = active ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 }
      }
    })
    if (!active && gone.size === cards.length) {
      setTimeout(() => {
        setShowHome(true)
      }, 600)
    }
  })

  if (showHome) return <Home />

  return (
    <div className="deck-root">
      {/* Centered stack */}
      <div className="deck-center">
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              x,
              y,
              transform: interpolate([rot, scale], utils.trans),
              transformOrigin: "center center",
              translateX: "-50%",
              translateY: "-50%"
            }}
          >
            <animated.div
              {...bind(i)}
              style={{
                backgroundImage: `url(/img/${cards[i].url})`,
                // width: cards[i].orientation === "portrait" ? small : large,
                // height: cards[i].orientation === "portrait" ? large : small
                width: cards[i].orientation === "portrait" ? "360px" : "480px",
                height: cards[i].orientation === "portrait" ? "480px" : "360px"
              }}
            />
          </animated.div>
        ))}
      </div>

    </div>
  )
}
