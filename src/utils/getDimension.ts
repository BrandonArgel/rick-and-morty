interface Props {
  url: string;
}

export const getDimension = async ({ url }: Props): Promise<any> => {
  const { dimension } = await fetch(url).then(res => res.json()).catch((e) => console.error(e))

  return dimension
}
