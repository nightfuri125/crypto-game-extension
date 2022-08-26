import { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { RootStateOrAny, useSelector } from "react-redux";
import placeholder from "../../assets/img/placeholder/avatar.png";
import { apiCaller } from "../utils/fetcher";
import { Promise } from "bluebird";
import axios from "axios";

export const getNfts = (
  username,
  solanaAddress,
  manual
) => {
  const [solNfts, setSolNfts] = useState([]);

  const [ethNfts, setEthNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { authFlag, publicKey } = useSelector((state) => ({
    authFlag: state.auth.authFlag,
    publicKey: state.auth.publicKey,
  }));

  useEffect(() => {
    getSolanaNftData();
  }, [solNfts.length]);

  if (!solanaAddress) {
    solanaAddress = publicKey;
  }

  const getSolanaNfts = async () => {
    if (!solanaAddress) return;
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const _nfts = await getParsedNftAccountsByOwner({
      publicAddress: solanaAddress,
      connection,
    });
    const formattedNfts = _nfts.map(({ mint, data: { name, uri } }) => ({
      name,
      uri,
      mintAddress: mint,
      type: "Solana",
      image: placeholder.src,
      collectionName: "Loading...",
    }));
    setSolNfts(formattedNfts);
  };

  const getEthereumNfts = async () => {
    if (!username) return;
    try {
      const {
        data: { nfts: _nfts },
      } = await apiCaller.get("/nfts/eth?owner=" + username);
      const formattedNfts = _nfts
        .map(({ contract: { address }, media, metadata, id: { tokenId } }) => ({
          contractAddress: address,
          tokenId,
          type: "Ethereum",
          image: (media.length > 0 && media[0].gateway) || "",
          collectionName: metadata.collection || metadata.name,
          name: metadata.name,
        }))
        .filter(({ image }) => Boolean(image));
      setEthNfts([...ethNfts, ...formattedNfts]);
    } catch { }
  };

  const getSolanaNftData = async () => {
    if (solNfts.length === 0) return;
    const newSolNfts = [...solNfts];
    await Promise.map(newSolNfts, async (nft) => {
      const uri = nft["uri"];
      try {
        const { data } = await axios.get(uri);
        const { collection, image } = data;
        nft.collectionName = collection ? collection.name : "-";
        nft.image = image;
      } catch (err) { }
      setSolNfts([...newSolNfts]);
    });
  };

  const getAllData = async () => {
    setLoading(true);
    setError(false);
    try {
      await Promise.all([getSolanaNfts(), getEthereumNfts()]);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!manual) {
      getAllData();
    }
  }, []);
  return [[...solNfts, ...ethNfts], loading, error, getAllData];
};
