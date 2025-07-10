'use client'

import ParamKwButton from "./atoms/param-kw-button";
import { useSearchParams } from "next/navigation";
import { KeywordsByTag } from "../lib/type";
import { useState } from "react";

export default function InspectKeyword({
  kwByTag
}: {
  kwByTag: KeywordsByTag;
}) {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const tag = newParams.get("tag");
  const urlKeywords = newParams.getAll("keyword");

  const tagKeywords = tag ? kwByTag[tag] : kwByTag['전체'];
  const [keywords, setKeywords] = useState(tagKeywords);

  const noteKeywords = urlKeywords.filter(kw => !keywords.includes(kw));
  noteKeywords.map(kw => {
    setKeywords(
      [ ...keywords, kw]
    );
  })


  return (
    <>
      <div className="w-72 flex gap-1 flex-wrap py-1 pointer-events-auto">
        <ParamKwButton keywords={keywords} />
      </div>
    </>
  )
}