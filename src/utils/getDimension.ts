interface Props {
  url: string;
}

export const getDimension = async ({ url }: Props): Promise<string> => {
  const { dimension } = await fetch(url).then(res => res.json()).catch((e) => console.error(e))

  return dimension
}
