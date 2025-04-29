import React, { useState, useEffect } from "react";
import { fetchUniversities, University } from "@/data/universities";
import { toast } from "@/components/ui/use-toast";

const UniversityList: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUniversities = async () => {
      setLoading(true);
      const data = await fetchUniversities();
      if (data.length > 0) {
        setUniversities(data);
      } else {
        setError("Failed to load universities");
        toast({
          title: "Error",
          description: "Failed to load universities. Please try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    };
    loadUniversities();
  }, []);

  if (loading) return <div>Loading universities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Universities</h2>
      <ul className="space-y-2">
        {universities.map((university) => (
          <li key={university.id} className="p-2 border rounded">
            {university.name} - {university.location} (Rank: {university.rank || "N/A"})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityList;