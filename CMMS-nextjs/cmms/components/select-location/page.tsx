"use client";
import React, {
  useState,
  useEffect,
  startTransition,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useToast } from "@/hooks/use-toast";
import { createLocation } from "@/lib/actions/delivery-address/address";

type Location = {
  value: string;
  label: string;
};

interface SelectLocationProps {
  setIsDialogOpen: (value: boolean) => void;
}
export default function SelectLocation({
  setIsDialogOpen,
}: SelectLocationProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [address, setAddress] = useState<string | null>(
    session?.user.user.address || null
  );
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  // const fullAddress = `${address ?? ""}, ${
  //   selectedWard
  //     ? wards.find((ward) => ward.value === selectedWard)?.label + ", "
  //     : ""
  // }${
  //   selectedDistrict
  //     ? districts.find((district) => district.value === selectedDistrict)
  //         ?.label + ", "
  //     : ""
  // }${
  //   selectedProvince
  //     ? provinces.find((province) => province.value === selectedProvince)?.label
  //     : ""
  // }`.trim();
  const tinh = provinces.find(
    (province) => province.value === selectedProvince
  )?.label;
  const huyen = districts.find(
    (district) => district.value === selectedDistrict
  )?.label;
  const xa = wards.find((ward) => ward.value === selectedWard)?.label;

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) =>
        setProvinces(
          response.data.map((item: any) => ({
            value: item.code,
            label: item.name,
          }))
        )
      )
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Fetch districts based on selected province
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) =>
          setDistricts(
            response.data.districts.map((item: any) => ({
              value: item.code,
              label: item.name,
            }))
          )
        )
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedProvince]);

  // Fetch wards based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((response) =>
          setWards(
            response.data.wards.map((item: any) => ({
              value: item.code,
              label: item.name,
            }))
          )
        )
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict]);
  const handlePaymentClick = async () => {
    // Validate address inputs
    if (!address) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedProvince) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn tỉnh/thành phố.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedDistrict) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn quận/huyện.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedWard) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn phường/xã.",
        variant: "destructive",
      });
      return;
    }

    const Data = {
      province: tinh,
      district: huyen,
      ward: xa,
      address: address,
    };

    try {
      const response = await createLocation(Data);

      if (response.data) {
        toast({
          title: "Cập nhật địa chỉ thành công.",
          description: response.data.message || "Thành công",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        await signIn();
        setIsDialogOpen(false);
      } else {
        toast({
          title: "Lỗi",
          description:
            response.error || "Đã xảy ra lỗi không xác định. Vui lòng thử lại.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Lỗi",
        description: "Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="text-black">
      <div className="grid items-center gap-1.5">
        <Label className="text-[16px]">Tỉnh thành</Label>
        <Popover open={openProvince} onOpenChange={setOpenProvince}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openProvince}
              className="w-full justify-between"
            >
              {selectedProvince
                ? provinces.find(
                    (province) => province.value === selectedProvince
                  )?.label
                : "Chọn tỉnh..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Tìm kiếm tỉnh..." />
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>Không tìm thấy!</CommandEmpty>
                <CommandGroup>
                  {provinces.map((province) => (
                    <CommandItem
                      key={province.value}
                      onSelect={() => {
                        setSelectedProvince(province.value);
                        setOpenProvince(false);
                      }}
                    >
                      <Check
                        className={
                          selectedProvince === province.value
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      />
                      {province.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* District Selector */}
      <div className="grid items-center gap-1.5">
        <Label className="text-[16px]">Quận huyện</Label>
        <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openDistrict}
              className="w-full justify-between"
              disabled={!selectedProvince}
            >
              {selectedDistrict
                ? districts.find(
                    (district) => district.value === selectedDistrict
                  )?.label
                : "Chọn quận/huyện..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0 over">
            <Command>
              <CommandInput placeholder="Tìm kiếm quận/huyện..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy!</CommandEmpty>
                <CommandGroup>
                  {districts.map((district) => (
                    <CommandItem
                      key={district.value}
                      onSelect={() => {
                        setSelectedDistrict(district.value);
                        setOpenDistrict(false);
                      }}
                    >
                      <Check
                        className={
                          selectedDistrict === district.value
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      />
                      {district.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Ward Selector */}
      <div className="grid items-center gap-1.5">
        <Label className="text-[16px]">Phường xã</Label>
        <Popover open={openWard} onOpenChange={setOpenWard}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openWard}
              className="w-full justify-between"
              disabled={!selectedDistrict}
            >
              {selectedWard
                ? wards.find((ward) => ward.value === selectedWard)?.label
                : "Chọn phường/xã..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] sm:w-[500px] lg:w-[200px] xl:w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Tìm kiếm phường/xã..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy!</CommandEmpty>
                <CommandGroup>
                  {wards.map((ward) => (
                    <CommandItem
                      key={ward.value}
                      onSelect={() => {
                        setSelectedWard(ward.value);
                        setOpenWard(false);
                      }}
                    >
                      <Check
                        className={
                          selectedWard === ward.value
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      />
                      {ward.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid mt-4 items-center gap-1.5">
        <Label className="text-[16px]">Địa chỉ</Label>
        <Input
          className="w-full"
          type="text"
          id="adress"
          value={address ?? ""}
          onChange={handleAddressChange}
          placeholder="Địa chỉ"
        />
      </div>
      <div className="mt-5 flex justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          onClick={handlePaymentClick}
        >
          Giao đến địa chỉ này
        </Button>
      </div>
    </div>
  );
}
