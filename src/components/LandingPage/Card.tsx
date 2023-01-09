import {
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useMediaQuery,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Inktrap } from '../FontFamily';
import { trackType } from '../../../interfaces/track';
import { FiExternalLink } from 'react-icons/fi';
import Sponsor from './Sponsor';

const Card = ({
  activeTrackHandler,
  track,
}: {
  activeTrackHandler: (track: trackType | undefined) => void;
  track?: trackType;
}) => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [glarePosition, setGlarePosition] = useState({
    x: -150,
    y: -150,
  });

  const handleMouseMove = (event: {
    preventDefault: () => void;
    nativeEvent: { offsetX: any; offsetY: any };
  }) => {
    event.preventDefault();
    setGlarePosition({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  useEffect(() => {}, []);

  return (
    <WrapItem
      onClick={() => {
        console.log('track clicked');
        if (isMobile) {
          setClicked((prevValue) => !prevValue);
          return;
        }
        activeTrackHandler(track);
      }}
    >
      <VStack
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseOutCapture={() => {
          setGlarePosition({
            x: -150,
            y: -150,
          });
        }}
        cursor={'pointer'}
        overflow='hidden'
        onMouseMove={handleMouseMove}
        _before={{
          content: `" "`,
          position: 'absolute',
          top: `${glarePosition.y}px`,
          left: `${glarePosition.x}px`,
          transform: 'translate(-2rem, -2rem)',
          overflow: 'hidden',
          width: '5rem',
          height: '5rem',
          filter: 'blur(70px)',
          backgroundColor: 'rgba(173, 166, 240, 0.9);',
        }}
        _after={{
          content: `" "`,
          position: 'absolute',
          inset: '0',
          borderRadius: '1.2rem',
          padding: '4px',
          background: hover
            ? 'linear-gradient(20.84deg,rgba(230, 55, 195, 0.5), rgba(214, 38, 177, 1),  rgba(249, 252, 127, 1))'
            : '',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          MaskComposite: 'exclude',
        }}
        w={{ base: '85vw', sm: '38vw', md: '18rem' }}
        alignItems={'start'}
        background={'rgba(88, 82, 139, 0.2)'}
        sx={{
          backdropFilter: 'blur(14px)',
          margin: '0px !important',
          marginTop: '0px !important',
        }}
        borderRadius={'1.2rem'}
        p='1.6rem'
        m='0px !important'
      >
        <Heading
          fontWeight={'700'}
          fontSize={{ base: '14px', md: '18px' }}
          noOfLines={1}
        >
          {track ? track?.Name : 'Hello World'}
        </Heading>
        <HStack alignItems={'flex-end'} justifyContent={'space-between'}>
          <Heading
            bgGradient={
              'linear-gradient(247.98deg, #E637C3 -8.03%, #D626B1 37.2%, #FAFC7F 109.33%)'
            }
            bgClip={'text'}
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
            fontWeight='700'
          >
            {track ? track?.PrizeWorth : '00k'}
          </Heading>
          <Text
            pb={{ base: '0.1rem', md: '0.3rem' }}
            fontSize={{ base: 'sm', md: 'lg' }}
            fontWeight={'600'}
          >
            {track ? track?.PizeUnit : 'USDC'}
          </Text>
        </HStack>
        {clicked ? (
          ''
        ) : !isMobile ? (
          ''
        ) : (
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            pt={'1.4rem'}
            fontWeight='300'
            opacity='0.8'
            noOfLines={2}
          >
            {track
              ? track?.Description
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
          </Text>
        )}
        {isMobile && clicked && (
          <VStack
            maxW={'full'}
            alignItems={'start'}
            p='2.5rem 0rem 2rem 0rem'
            rounded='2xl'
          >
            <VStack pt={'0rem'} fontSize='xl' alignItems={'start'}>
              {track?.Sponsor! ? (
                <HStack gap='1rem'>
                  {track.Sponsor?.map((sponsor, index) => (
                    <Sponsor sponsorName={sponsor} key={index} />
                  ))}
                </HStack>
              ) : (
                ''
              )}
              <Text
                fontFamily={Inktrap.style.fontFamily}
                fontSize={{ base: 'sm', md: 'md' }}
                pt='0.4rem'
              >
                {track
                  ? track?.Description
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
              </Text>
              {track?.PrizeDetails?.length! && (
                <>
                  <Text
                    fontFamily={Inktrap.style.fontFamily}
                    pt='1.4rem'
                    fontWeight={'700'}
                    fontSize={{ base: 'md', md: 'lg' }}
                  >
                    Prizes
                  </Text>
                  <UnorderedList
                    fontFamily={Inktrap.style.fontFamily}
                    fontSize={{ base: 'sm', md: 'md' }}
                    pl='1.5rem'
                  >
                    {track?.PrizeDetails?.map((prizeDetail, index) => (
                      <ListItem maxW='100vw' key={index}>
                        {prizeDetail}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </>
              )}
              {track?.Ideas![0] && (
                <>
                  <Text
                    pt='1rem'
                    fontFamily={Inktrap.style.fontFamily}
                    fontWeight={'700'}
                    fontSize={{ base: 'md', md: 'lg' }}
                  >
                    Ideas
                  </Text>
                  <UnorderedList
                    fontFamily={Inktrap.style.fontFamily}
                    fontSize={{ base: 'sm', md: 'md' }}
                    pl='1.5rem'
                  >
                    {track.Ideas?.map((idea, index) => (
                      <ListItem key={index}>{idea}</ListItem>
                    ))}
                  </UnorderedList>
                </>
              )}
              <Wrap py='1rem'>
                {track?.Links?.map((link, index) => (
                  <WrapItem key={index}>
                    <Button
                      as='a'
                      href={link.Link}
                      target={'_blank'}
                      fontFamily={Inktrap.style.fontFamily}
                      backdropFilter='blur(10px)'
                      backgroundColor='rgba(255, 255, 255, 0.10)'
                      rounded={'full'}
                      p='0.35rem 1rem 0rem 1rem'
                      color='white'
                      fontSize={{ base: 'xs', md: 'sm' }}
                      rightIcon={
                        <FiExternalLink
                          style={{
                            transform: 'translateY(-4px)',
                            width: '12px',
                          }}
                        />
                      }
                    >
                      {link.Title}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          </VStack>
        )}
      </VStack>
    </WrapItem>
  );
};

export default Card;
